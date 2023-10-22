const { spawn } = require("child_process");
const path = require("path");
function abrirLol(caminho) {
  var execucao = caminho.split(/[\\|\/]/);

  const programToOpen = path.join(...execucao);
  // Use 'spawn' to open the program
  const child = spawn(programToOpen);

  // Handle any errors
  child.on("error", (error) => {
    console.error("Error:", error);
  });
}

module.exports.lol = abrirLol;
