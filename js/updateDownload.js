const { shell, ipcRender } = require('electron')
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
startUpdateB.addEventListener('click', function () {
    shell.openExternal(updateBox.getAttribute("link"));
});