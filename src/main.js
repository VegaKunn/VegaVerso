const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
const settings = require("electron-settings");

const a = require("./executarComandos");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL("http://localhost:3000/");

  ipcMain.on("navegar", (event, data) => {
    createNewWindow(data);
  });
  ipcMain.on("atualizar global", (event, data) => {
    if (data === "pegar") {
      let globalAtualizado = settings.getSync("global");
      event.sender.send("global atualizado", globalAtualizado);
    }
    if (data.atualizar === "atualizar") {
      settings.setSync("global", data.global);
    }
  });

  ipcMain.on("solicitar-informacao", (event, arg) => {
    createNewWindow("http://www.google.com");
    createNewWindow("http://www.youtube.com");

    // Aqui você pode processar  solicitação e enviar uma resposta de volta para o processo renderizador.
    event.reply("informacao-resposta", "Os dados que você solicitou.");
  });
};

async function teclasDeAtalho(arrayDeComandos) {
  let { comandos } = settings.getSync("global");
  comandos.map((item) => {
    globalShortcut.register(item.comando, () => {
      a.lol(item.caminho);
      console.log(item.comando);
    });
  });
}

app.whenReady().then(() => {
  createWindow();
  teclasDeAtalho([1]);
});

// Crie uma nova janela quando um evento for acionado (por exemplo, clicando em um botão)
function createNewWindow(novaUrl) {
  const newWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Carregue um arquivo HTML ou URL na nova janela
  newWindow.loadURL(novaUrl); // Altere para o caminho ou URL desejado

  // Defina o comportamento da nova janela quando fechada
  newWindow.on("closed", () => {
    // Você pode realizar ações aqui quando a janela for fechada, se necessário
  });
}

// Evento para criar uma nova janela quando necessário (por exemplo, ao clicar em um botão)
// Chame esta função sempre que desejar criar uma nova janela
app.on("new-window", createNewWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
