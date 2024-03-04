function edit(num) {
    singleEditBox.setAttribute("cid", num);
    singleEditBox.setAttribute("open", "true");
    singleEditCover.setAttribute("open", "true");
    singleEditURL.value = (getChannel("url", num) ? getChannel("url", num) : "");
    singleEditName.value = (getChannel("name", num) ? getChannel("name", num) : "");
}

function saveSingleEdit() {
    num = singleEditBox.getAttribute("cid");
    if (singleEditURL.value == "" || singleEditName.value == "" || !checkLink(singleEditURL.value)) {
        newMsgBox("请填写正确的数据。");
    }
    else {
        try {
            setChannel("name", num, singleEditName.value);
            setChannel("url", num, singleEditURL.value);
            closeEdit();
            newBlock(num);
            refreshBlockListType();
        }
        catch (err) { newMsgBox("啊哦，出现错误，操作失败。"); console.error(err) }
    }
}

function closeEdit() {
    singleEditBox.setAttribute("cid", "");
    singleEditBox.setAttribute("open", "false");
    singleEditCover.setAttribute("open", "false");
    setTimeout(() => {
        singleEditURL.value = "";
        singleEditName.value = "";
    }, 2000);
}

function addSingle() {
    if (document.getElementsByClassName("screamSingle").length >= 16) {
        newMsgBox("添加的频道数量已经达到上限。");
        return false;
    }
    edit(Object.keys(JSON.parse(localStorage.getItem('channelList')).channels).length)
}

function openRight(id) {
    div = document.getElementById(id);
    if (div.getAttribute("open") == "true") {
        div.setAttribute("open", "false");
        pageRight.setAttribute("show", "");
    }
    else {
        pageRight.setAttribute("show", "relative");
        for (p = 0; p < pageRight.getElementsByClassName("rightFrame").length; p++) {
            pageRight.getElementsByClassName("rightFrame")[p].setAttribute("open", "false");
        }
        div.setAttribute("open", "true");
    }
}

editTemplate = `
<div id="link{{id}}" class="singleLink">
<div class="inputInner">
<label for="add">地址
</label>
<input name="add" value="{{url}}">
</div>
<div class="inputInner">
<label for="name">名称</label>
<input name="name" value="{{name}}">
</div>
<div class="buttons right">
<button class="small material-icons" onclick="upLink({{id}})" title="Up">&#xe5d8;</button><button class="small material-icons" onclick="downLink({{id}})" title="Down">&#xe5db;</button><button class="small material-icons" onclick="delLink({{id}})" title="Delete">&#xe872;</button>
</div>
</div>
`;

// 链接管理器

openEdit.onclick = function () {
    openRight("editFrame");
    linkEditBlock.innerHTML = "";
    channels = JSON.parse(localStorage.getItem("channelList")).channels;
    for (linkCache = 0; linkCache < Object.keys(channels).length; linkCache++) {
        nowLinkInfo = channels[linkCache];
        linkEditBlock.innerHTML += editTemplate.replace(/{{id}}/g, linkCache).replace(/{{name}}/g, nowLinkInfo.name).replace(/{{url}}/g, nowLinkInfo.url);
    }
}
function delLink(id) {
    setInputValueAttribute();
    document.getElementById("link" + id).outerHTML = "";
}
function addLink() {
    setInputValueAttribute();
    if (linkEditBlock.getElementsByClassName("singleLink").length >= 16) {
        return newMsgBox("添加的频道数量已经达到上限。");
    }
    linkCache++;
    linkFC = linkEditBlock.innerHTML;
    linkEditBlock.innerHTML += editTemplate.replace(/{{id}}/g, linkCache).replace(/{{name}}/g, "").replace(/{{url}}/g, "");
}
function upLink(id) {
    setInputValueAttribute();
    linkPlace = whereIsLink(id);
    if (linkPlace == 0 || linkPlace == -1)
        return -1;
    placeHTMLCache = linkEditBlock.getElementsByClassName("singleLink")[linkPlace].outerHTML;
    linkEditBlock.getElementsByClassName("singleLink")[linkPlace].outerHTML = "";
    linkEditBlock.getElementsByClassName("singleLink")[linkPlace - 1].outerHTML = placeHTMLCache + linkEditBlock.getElementsByClassName("singleLink")[linkPlace - 1].outerHTML;
}
function downLink(id) {
    setInputValueAttribute();
    linkPlace = whereIsLink(id);
    if (linkPlace == linkEditBlock.getElementsByClassName("singleLink").length || linkPlace == -1)
        return -1;
    placeHTMLCache = linkEditBlock.getElementsByClassName("singleLink")[linkPlace].outerHTML;
    linkEditBlock.getElementsByClassName("singleLink")[linkPlace + 1].outerHTML = linkEditBlock.getElementsByClassName("singleLink")[linkPlace + 1].outerHTML + placeHTMLCache;
    linkEditBlock.getElementsByClassName("singleLink")[linkPlace].outerHTML = "";
}
function whereIsLink(id) {
    for (whereIsCache = 0; whereIsCache < linkEditBlock.getElementsByClassName("singleLink").length; whereIsCache++) {
        setInputValueAttribute();
        if (linkEditBlock.getElementsByClassName("singleLink")[whereIsCache] == document.getElementById("link" + id)) {
            return whereIsCache;
        }
    }
    return -1;
}
// outLinks.onclick = function () {
//     saveLinks.click();
//     copy(localStorage.getItem("fastLinks"));
//     alert("Copied. ");
// }
// inLinks.onclick = function () {
//     inLinksStr = prompt("Paste the item to import: ", "");
//     try {
//         JSON.parse(inLinksStr);
//         localStorage.setItem("fastLinks", inLinksStr);
//     }
//     catch (err) {
//         alert("The JSON has been destroyed. <br />Detail: " + err);
//     }
//     linkManageB.click();
// }
saveLinks.onclick = function () {
    var saveJSON = { "channels": [] };
    for (saveCache = 0; saveCache < linkEditBlock.getElementsByClassName("singleLink").length; saveCache++) {
        nowSaving = linkEditBlock.getElementsByClassName("singleLink")[saveCache];
        saveAdd = nowSaving.getElementsByTagName("input")[0].value;
        saveName = nowSaving.getElementsByTagName("input")[1].value;
        if (!saveName || !checkLink(saveAdd)) {
            newMsgBox("请填写正确的数据。");
            return -1;
        }
        saveJSON.channels[saveCache] = {};
        saveJSON.channels[saveCache].name = saveName;
        saveJSON.channels[saveCache].url = saveAdd;
    }
    localStorage.setItem("channelList", JSON.stringify(saveJSON));
    refreshBlocks();
}

function setInputValueAttribute() {
    for (setInputValueAttributeCache = 0; setInputValueAttributeCache < linkEditBlock.getElementsByTagName("input").length; setInputValueAttributeCache++) {
        linkEditBlock.getElementsByTagName("input")[setInputValueAttributeCache].setAttribute("value", linkEditBlock.getElementsByTagName("input")[setInputValueAttributeCache].value);
    }
}