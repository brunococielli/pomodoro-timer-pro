const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

app.setName("Pomodoro Timer")
app.setAppUserModelId("Pomodoro Timer")

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
		icon: path.join(process.cwd(), "assets", "icon.ico"),
    webPreferences: {
      preload: path.join(__dirname, 'js', 'preload.js'), // optional
    },
  });

  // ✅ Remove the top menu bar
  Menu.setApplicationMenu(null);
  win.setMenuBarVisibility(false);

  // ✅ Load your HTML file (important: correct path!)
  win.loadFile(path.join(__dirname, 'html', 'index.html'));

  // win.webContents.openDevTools(); // optional for debugging
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});