// 定义最大宽度
window.onresize = function () {
    leftInner.style.maxWidth = leftInner.clientHeight / 0.66 + "px";
}
leftInner.style.maxWidth = leftInner.clientHeight / 0.66 + "px";

// 关灯
closeLamp.onclick = function () {
    if (leftOpe.getAttribute("close") == "true") {
        leftOpe.setAttribute("close", "false");
    }
    else leftOpe.setAttribute("close", "true");
}