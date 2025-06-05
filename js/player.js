function newPlayer(num) {
    if (getChannel('type', num) == "webpage") {
        getChannelElement(num).getElementsByClassName("player")[0].innerHTML = `<iframe class="player-iframe" src="${getChannel("url", num)}" frameborder="0" allowfullscreen></iframe>`;
        return;
    }
    dp = new DPlayer({
        container: document.getElementsByClassName("player")[num],
        autoplay: true,
        live: true,
        lang: 'zh-cn',
        screenshot: true,
        preload: 'auto',
        volume: 1,
        mutex: false,
        video: {
            url: getChannel("url", num),//'http://183.207.249.9/PLTV/3/224/3221225530/1.m3u8',  //
            type: 'auto',
        },
        contextmenu: [
            {
                text: '关闭',
                link: '',
            }
        ]
    });
}

function showPlayerMenu(num) {
    if (getChannelElement(num).getElementsByClassName("dplayer-menu")[0].className.indexOf("sudo-open") > 0)
        getChannelElement(num).getElementsByClassName("dplayer-menu")[0].className = getChannelElement(num).getElementsByClassName("dplayer-menu")[0].className.replace(/sudo-open/g, "");
    else {
        getChannelElement(num).getElementsByClassName("dplayer-menu")[0].className += " sudo-open ";
        // getChannelElement(num).getElementsByClassName("dplayer-menu")[0].innerHTML = document.getElementsByClassName("dplayer-menu")[num].innerHTML.replace(`关于作者`, "关于").replace(`https://diygod.me`, "https://anbo.space");
        getChannelElement(num).getElementsByClassName("dplayer-menu")[0].setAttribute("onclick", "showPlayerMenu(" + num + ")")
    }
}