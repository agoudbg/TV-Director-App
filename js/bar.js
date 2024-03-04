const { ipcRenderer: ipc } = require('electron');
export default {
    name: 'closeWindow',
    props: ['type'],
    computed: {
        style: function () {
            return style[this.type];
        }
    },
    methods: {
        click: function () {
            ipc.send(this.type);
        }
    }
}
// 最小化、最大化、关闭按钮
document.getElementById('closeWindow').onclick = function () {
    ipc.send('close');
}
document.getElementById('maxWindow').onclick = function () {
    ipc.send('max');
}
document.getElementById('minWindow').onclick = function () {
    ipc.send('min');
}
document.getElementById('fullWindow').onclick = function () {
    ipc.send('full');
}
ipc.on("send-message-to-renderer", (event, args) => {
    console.log("渲染进程收到的数据: ", args);
})
ipc.on("windowStatusChange", (event, args) => {
    if (args == "true") {
        document.getElementsByTagName("body")[0].className = " res";
        maxWindow.className = " res";
        console.log("maxed");
    }
    else {
        document.getElementsByTagName("body")[0].className = "";
        maxWindow.className = "";
        console.log("notmax");
    }
})
ipc.on("fullStatusChange", (event, args) => {
    if (args == "true") {
        document.getElementsByTagName("body")[0].className = " full";
        maxWindow.className = " full";
        console.log("fullScreen");
    }
    else {

        document.getElementsByTagName("body")[0].className = ipc.send('maxed');
        maxWindow.className = ipc.send('maxed');
        console.log("notfullScreen");
    }
})
