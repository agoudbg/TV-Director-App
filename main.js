const { app, BrowserWindow } = require('electron')
//获取ipc对象
const ipcMain = require('electron').ipcMain

app.commandLine.appendSwitch("disable-site-isolation-trials");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
    // 创建浏览器窗口。
    win = new BrowserWindow({
        minHeight: 750,
        minWidth: 1000,
        frame: false,
        devTools: false,
        titleBarStyle: 'hidden',
        transparent: false,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            contextIsolation: false
        },
        backgroundColor: '#ffffff'
    })
    // 解决CORS
    app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
    // 然后加载应用的 index.html。
    win.loadFile('index.html')

    // 打开开发者工具
    // win.webContents.openDevTools()

    // 当 window 被关闭，这个事件会被触发。
    win.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        win = null
    })

    // 最小化、最大化
    win.on('maximize', () => {
        if (!win.isFullScreen())
            win.webContents.send("windowStatusChange", "true");
    })
    win.on('unmaximize', () => {
        win.webContents.send("windowStatusChange", "false");
    })
    win.on('enter-full-screen', () => {
        win.webContents.send("fullStatusChange", "true");
    })
    win.on('leave-full-screen', () => {
        win.webContents.send("fullStatusChange", "false");
    })
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (win === null) {
        createWindow()
    }
})

ipcMain.on('min', (event, args) => win.minimize())
ipcMain.on('max', (event, args) => {
    if (win.isMaximized()) {
        win.unmaximize()

    } else {
        win.maximize()
    }
})
// 返回是否最大化
ipcMain.on('maxed', (event, args) => {
    event.reply("maxed", win.isMaximized())
})
ipcMain.on('full', (event, args) => {
    if (win.isFullScreen()
    ) {
        win.setFullScreen(false)
    } else {
        win.setFullScreen(true)
    }
})
ipcMain.on('close', (event, args) => win.close())
setTimeout(() => {
    win.webContents.send("send-message-to-renderer", "Test. ");
}, 3000)