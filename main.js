const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const sqlite3 = require('sqlite3').verbose();
// TODO configure from database.json
const db = new sqlite3.Database(__dirname + '/dev.db');

// IPC handlers

function sendHighScores(event = null) {
  db.all('SELECT name, score FROM high_scores ORDER BY score DESC LIMIT 10', (err, data) => {
    if (err) {
      console.error(err);
    }
    console.log(data);
    if (event) {
      event.sender.send('high_scores_updated', data);
    }
  });
}

ipcMain.on('ping', (event) => {
  event.sender.send('pong');
});

ipcMain.once('ping', (event) => {
  sendHighScores(event);
});

ipcMain.on('save_high_score', (event, highScore) => {
  console.log('save_high_score');
  console.log(highScore);
  const stmt = db.prepare("INSERT INTO high_scores(name, score) VALUES ($1, $2)");
  stmt.run(highScore.name, highScore.score);
  stmt.finalize();

  event.sender.send('high_scores_updated', sendHighScores(event));
})


// Browser window handlers

let win;

function createWindow() {
  win = new BrowserWindow({ 
    width: 800, 
    height: 600,
    webPreferences: {
      preload: __dirname + '/preload.js'
    }
  });

  // load the dist folder from Angular
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  // The following is optional and will open the DevTools:
  // win.webContents.openDevTools()

  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);

// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  if (db) {
    db.close();
  }
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// initialize the app's main window
app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

