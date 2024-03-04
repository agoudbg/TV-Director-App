function newBlock(num) {
    new_element = document.createElement('div');
    new_element.setAttribute("oncontextmenu", "showChannelMenu(" + num + ")");
    new_element.className = "screamSingle";
    new_element.setAttribute("num", num);
    new_element.setAttribute("id", "screamSingle" + num);
    new_element.innerHTML = blockHTML.replace(/{{name}}/g, getChannel("name", num)).replace(/{{num}}/g, num);
    if (!document.getElementById("screamSingle" + num)) screams.append(new_element);
    else document.getElementById("screamSingle" + num).outerHTML = new_element.outerHTML;
    newPlayer(num);
}

function refreshBlocks() {
    channelList = JSON.parse(localStorage.getItem("channelList"));
    screams.innerHTML = "";
    for (i = 0; i < Object.keys(channelList.channels).length; i++) {
        if (getChannel("name", i) == "-deleted-") {
            deleteChannel(i);
            i--;
            continue;
        }
        newBlock(i);
    }
    refreshBlockListType();
}

function refreshBlockListType() {
    l = document.getElementsByClassName("screamSingle").length;
    if (l == 1) screams.setAttribute("ltype", "x11");
    else if (l < 5) screams.setAttribute("ltype", "x22");
    else if (l < 7) screams.setAttribute("ltype", "x32");
    else if (l < 10) screams.setAttribute("ltype", "x33");
    else if (l < 13) screams.setAttribute("ltype", "x43");
    else if (l < 17) screams.setAttribute("ltype", "x44");
}

function addChannel(value, position) {
    channelList = JSON.parse(localStorage.getItem("channelList"));
    if (!position) position = Object.keys(channelList.channels).length;
    channelList.channels[position] = value;
    localStorage.setItem("channelList", JSON.stringify(channelList));
}

function deleteChannel(position) {
    channelList = JSON.parse(localStorage.getItem("channelList"));
    channelList.channels.splice(position, 1);
    localStorage.setItem("channelList", JSON.stringify(channelList));
}

function getChannel(type, num) {
    channelList = JSON.parse(localStorage.getItem("channelList"));
    console.log(channelList.channels[num]);
    try { return channelList.channels[num][type] }
    catch (err) { return undefined };
}

function setChannel(type, num, value) {
    channelList = JSON.parse(localStorage.getItem("channelList"));
    console.log(channelList[num]);
    if (!channelList.channels[num]) channelList.channels[num] = {};
    channelList.channels[num][type] = value;
    localStorage.setItem("channelList", JSON.stringify(channelList));
}

function softDeleteChannel(position) {
    setChannel("name", position, "-deleted-");
    deleteChannelHTML(position);
    refreshBlockListType();
}

function deleteChannelHTML(num) {
    getChannelElement(num).outerHTML = "";
}

function getChannelElement(num) {
    channelElements = screams.getElementsByClassName("screamSingle");
    for (j = 0; j < channelElements.length; j++) {
        if (channelElements[j].getAttribute("num") == num) return channelElements[j];
    }
}

if (!localStorage.getItem("channelList")) {
    localStorage.setItem("channelList", JSON.stringify({ "channels": [] }));
}

function showChannelMenu(id, byButton = false) {
    msgContextMenuItems = [["刷新", "newPlayer(" + id + ");", "&#xe5d5;"], ["编辑", "edit(" + id + ");", "&#xe3c9;"], ["删除", "softDeleteChannel(" + id + ")", "&#xe872;"], ["line"], ["显示更多选项", "showPlayerMenu(" + id + ");", "&#xe869;"]];
    createContextMenu(msgContextMenuItems);
}

function checkLink(link) {
    if (link.substring(0, 7) == "http://" || link.substring(0, 8) == "https://") return true;
    else {
        if (link.substring(0, 7) == "rtmp://" || link.substring(0, 7) == "rtsp://") {
            newMsgBox("\n\n啊哦，我们还不支持 rtmp 和 rtsp。")
        }
    } return false;

}

blockHTML = `
<div class="player"></div>
<div class="controller">
    <div class="opes"></div>
    <div class="name" title="{{name}}">{{name}}</div>
    <div class="moreButton">
        <button onclick="newPlayer({{num}});" title="刷新"><i
                class="material-icons">&#xe5d5;</i></button>
        <button onclick="showChannelMenu({{num}}, true)" title="更多"><i
                class="material-icons">&#xe5d3;</i></button>
    </div>
</div>`;


window.onload = function () {
    refreshBlocks();
}

function importDebug() {
    localStorage.setItem("channelList", JSON.stringify({
        "channels": [
            {
                "name": "1",
                "url": "https://111"
            },
            {
                "name": "2",
                "url": "https://111"
            },
            {
                "name": "3",
                "url": "https://111"
            },
            {
                "name": "4",
                "url": "https://111"
            },
            {
                "name": "5",
                "url": "https://111"
            },
            {
                "name": "6",
                "url": "https://111"
            },
            {
                "name": "7",
                "url": "https://111"
            },
            {
                "name": "8",
                "url": "https://111"
            },
            {
                "name": "9",
                "url": "https://111"
            },
            {
                "name": "10",
                "url": "https://111"
            }
        ]
    }));
}

// window.onerror = function (message, url, lineNo, columnNo, error) {
//     // alert("Error Occured: " + message + " in " + url + " at line " + lineNo + " " + columnNo + " " + error);
// }