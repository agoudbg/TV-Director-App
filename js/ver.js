const { version } = require('./package.json');

const versionName = version.split("+")[0];
const versionNum = version.split("+")[1];
const channel = "Stable";
nowVer.innerHTML = "当前版本: " + versionName + " (" + versionNum + ")";
