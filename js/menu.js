// 展示右键菜单
hasCreatedContextMenu = false;
function createContextMenu(items, customX = false, customY = false) {
    if (!hasCreatedContextMenu) {
        var time = gTime();
        new_element = document.createElement('div');
        new_element.setAttribute('id', 'contextMenu' + time);
        new_element.setAttribute('class', 'contextMenu');
        new_element.setAttribute('onclick', 'closeContextMenu(' + time + ')');
        for (createContextMenuItemsId = 0; createContextMenuItemsId < items.length; createContextMenuItemsId++) {
            if (items[createContextMenuItemsId][0] == "line") {
                new_element.innerHTML += `<div class="line"></div>`;
            } else new_element.innerHTML += `<button onclick="` + items[createContextMenuItemsId][1] + `;"><i class="material-icons">` + items[createContextMenuItemsId][2] + `</i>` + items[createContextMenuItemsId][0] + `</button>`;
            if (items[createContextMenuItemsId][2]) {
                new_element.setAttribute('icon', 'true');
            }
        }
        document.body.appendChild(new_element);
        // 判断位置
        // 获取div宽高
        menuWidth = document.getElementById('contextMenu' + time).clientWidth;
        menuHeight = document.getElementById('contextMenu' + time).clientHeight - 2 * Number(getComputedStyle(document.getElementById('contextMenu' + time), false)["paddingTop"].replace(/px/g, ""));
        // alert(menuWidth+" "+menuHeight);
        // 获取页面宽高
        pageWidth = document.body.clientWidth;
        pageHeight = window.innerHeight;
        // alert(pageWidth+" "+pageHeight);
        console.log("Now mouse at " + mouseX + " " + mouseY);
        console.log("Now menu as " + menuWidth + " " + menuHeight);
        //对比宽度
        if (customX == false && menuWidth + mouseX < pageWidth)
            menuX = "r";
        else if (menuWidth - mouseX < 0) menuX = "l";
        else { // 左右都不够，委屈一下菜单
            if (mouseX * 2 > pageWidth) { // 即左边空间多
                menuX = "l";
                document.getElementById('contextMenu' + time).style.width = mouseX + "px";
            }
            else {
                menuX = "r";
                document.getElementById('contextMenu' + time).style.width = (pageWidth - mouseX) + "px";
            }
            // 重新获取页面宽高
            pageWidth = document.body.clientWidth;
            pageHeight = window.innerHeight;
        }
        if (customY == false && menuHeight + mouseY > pageHeight)
            menuY = "t";
        else menuY = "b";
        if (menuX == "r") {
            document.getElementById('contextMenu' + time).style.left = mouseX + "px";
        } else if (menuX == "l") {
            document.getElementById('contextMenu' + time).style.right = (pageWidth - mouseX) + "px";
        }
        if (menuY == "b") {
            document.getElementById('contextMenu' + time).style.top = mouseY + "px";
        } else if (menuY == "t") {
            document.getElementById('contextMenu' + time).style.bottom = (pageHeight - mouseY) + "px";
        }
        console.log(menuX + menuY);
        // 根据高度制作动画
        new_element = document.createElement('style');
        new_element.innerHTML = `
        @keyframes contextMenu{
            0%{
                opacity: 0;
                width: 0;
                max-height: 0vh;
                overflow: hidden;
            }
            6%{
                opacity: 1;
            }
            99%{
                overflow: hidden;
            }
            100%{
                opacity: 1;
                width: `+ menuWidth + `;
                max-height: `+ menuHeight + `px;
            }
        }`;
        document.body.appendChild(new_element);
        document.getElementById('contextMenu' + time).style.animation = "contextMenu 0.35s";
        new_element = document.createElement('div');
        new_element.setAttribute('id', 'commonCover' + time);
        new_element.setAttribute('class', 'commonCover');
        new_element.setAttribute('onclick', 'closeContextMenu(' + time + ')');
        new_element.setAttribute('oncontextmenu', 'closeContextMenu(' + time + ')');
        document.body.appendChild(new_element);
        hasCreatedContextMenu = true;
        setTimeout(() => {
            hasCreatedContextMenu = false;
        }, 10);
    }
}

function closeContextMenu(time) {
    document.getElementById('commonCover' + time).outerHTML = "";
    document.getElementById('contextMenu' + time).setAttribute("die", "true");
    document.getElementById('contextMenu' + time).outerHTML = "";

}
function gTime() {
    time = new Date();
    return time.getTime() + 60000 * time.getTimezoneOffset();
}
// 获取鼠标位置
window.onmousemove = function (event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
};

// msgBox
function newMsgBox(msg) {
    var time = gTime();
    new_element = document.createElement('div');
    new_element.setAttribute('id', 'msgBox' + time);
    new_element.setAttribute('class', 'msgBox');
    new_element.innerHTML = msg;
    document.body.appendChild(new_element);
    setTimeout(() => {
        document.getElementById('msgBox' + time).outerHTML = "";
    }, 10000);
}