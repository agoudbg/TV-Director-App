apiURL = "https://anbo.space/api/daobotai/update.json?t="+gTime();

function checkUpdate() {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                data = JSON.parse(xmlhttp.responseText.replace(/\r\n/g, "").replace(/ /g, ""));
                // 判断有没有新版本
                if (data['latestNum'] > versionNum) {
                    updateBox.setAttribute("open", "true");
                    updateCover.setAttribute("open", "true");
                    updateNewV.innerHTML = data['latestVer'] + " (" + data['latestNum'] + ")";
                    updateNowV.innerHTML = version + " (" + versionNum + ")";
                    updatedWhat.innerHTML = data[data['latestVer']]['log'];
                    updateTime.innerHTML = data[data['latestVer']]['time'];
                    updateCha.innerHTML = data[data['latestVer']]['channel'];
                    updateBox.setAttribute("link", data[data['latestVer']]['link']);
                    if (data['force']) {
                        closeUpdateB.style.display = "none";
                    }
                    else
                        closeUpdateB.style.display = "unset";
                }
                else {
                    updateResult.innerHTML = "你是最新的！当前使用的电视导播台是最新版本。";
                }
            }
            catch (err) {
                newMsgBox("检查更新时遇到了错误。");
                console.error(err);

            };
        }
    }
    xmlhttp.open("GET", apiURL, true);
    xmlhttp.send();
}

function closeUpdate() {
    updateBox.setAttribute("open", "false");
    updateCover.setAttribute("open", "false");
    setTimeout(() => {
        updateNewV.innerHTML = "";
        updateNowV.innerHTML = "";
        updatedWhat.innerHTML = "";
        updateBox.setAttribute("link", "");
    }, 2000);
}