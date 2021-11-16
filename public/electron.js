const {
  app,
  BrowserWindow,
  dialog,
  Tray,
  nativeImage,
  Menu,
} = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
require("./server");

const appElements = {
  tray: null,
  window: [],
};

function dashboardScreen(show = false) {
  appElements.window["win"] = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    show: show,
  });

  appElements.window["win"]
    .loadURL(
      isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`
    )
    .catch((err) => {
      console.log(err + "errorrrr");
      dialog
        .showMessageBox({
          title: "Error",
          message: "Gagal memuat URL target, cek koneksi Anda",
          type: "error",
          buttons: ["Muat Ulang", "Keluar"],
        })
        .then((res) => {
          splash.destroy();
          win.close();
          if (res.response === 0) {
            return splashScreen();
          }
        });
    });

  appElements.window["win"].on("close", (ev) => {
    appElements.window["win"] = null;
    ev.sender.hide();
    ev.preventDefault(); // prevent quit process
  });
}

function splashScreen() {
  dashboardScreen();
  appElements.window["splash"] = new BrowserWindow({
    width: 810,
    height: 610,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
  });

  appElements.window["splash"]
    .loadFile(__dirname + "/el_file/splash/splash_screen.html")
    .catch((err) => {
      console.log(err);
    });

  appElements.window["win"].once("ready-to-show", () => {
    appElements.window["splash"].destroy();
    appElements.window["splash"] = null;
    appElements.window["win"].show();
  });
}

function checkDashboardIsAvailable() {
  if (appElements.window["win"] == null) {
    dashboardScreen(true);
  }
}

app.once("ready", () => {
  appElements.tray = new Tray(nativeImage.createEmpty());
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Open Dashboard",
      click: () => checkDashboardIsAvailable(),
    },
    {
      label: "Exit",
      click: () => app.quit(),
    },
  ]);
  appElements.tray.setToolTip("This is my application.");
  appElements.tray.setContextMenu(contextMenu);

  splashScreen();
});

app.on('before-quit', ()=>{
  appElements.window["win"].removeAllListeners("close");
  appElements.tray = null;
  appElements.window = [];
})

// app.on("window-all-closed", function () {
//   // if (process.platform !== "darwin") app.quit();
// });
