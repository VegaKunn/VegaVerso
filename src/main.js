const { app, BrowserWindow, ipcMain } = require("electron");

const a = require("./executarComandos");

//a.lol();
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

    // Faça o que você desejar com os parâmetros aqui, por exemplo, executar alguma lógica no backend do Electron.
  });

  ipcMain.on("solicitar-informacao", (event, arg) => {
    createNewWindow("http://www.google.com");
    createNewWindow("http://www.youtube.com");

    // Aqui você pode processar a solicitação e enviar uma resposta de volta para o processo renderizador.
    event.reply("informacao-resposta", "Os dados que você solicitou.");
  });
};

app.whenReady().then(() => {
  createWindow();
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
