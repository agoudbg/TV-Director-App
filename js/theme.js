setTheme();
setName();

function setTheme() {
    resetButton("themeC");
    toSet = localStorage.getItem("theme");
    if (!toSet) {
        localStorage.setItem("theme", "dark");
        toSet = "dark";
    }
    if (toSet == "light") {
        lightThemeB.checked = "true";
    }
    if (toSet == "dark") {
        darkThemeB.checked = "true";
    }
    if (toSet == "auto") {
        autoThemeB.checked = "true";
        if (window.matchMedia('(prefers-color-scheme)').media != 'not all' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            toSet = "dark";
        }
        else toSet = "light";
    }
    console.log("Set theme to " + toSet);
    if (toSet == "dark")
        document.getElementsByTagName("body")[0].setAttribute("theme", "dark");
    else document.getElementsByTagName("body")[0].setAttribute("theme", "light");
}

function setName() {
    resetButton("nameC");
    toSet = localStorage.getItem("name");
    if (!toSet) { localStorage.setItem("name", "true"); toSet = "true"; }
    if (toSet == "true") {
        nameOpenB.checked = "true";
        screams.setAttribute("controller", "open");
    }
    if (toSet == "false") {
        nameCloseB.checked = "true";
        screams.setAttribute("controller", "close");
    }
    console.log("Set name to " + toSet);
}

function resetButton(id) {
    FEle = document.getElementById(id);
    CEle = FEle.getElementsByTagName("input");
    for (reset = 0; reset < CEle.length; reset++) {
        CEle[reset].className = "";
    }
}