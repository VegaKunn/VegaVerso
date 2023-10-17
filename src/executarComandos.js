const { spawn } = require("child_process");
const path = require("path");
function abrirLol() {
  const programToOpen = path.join(
    "C:",
    "Riot Games",
    "Riot Client",
    "RiotClientServices.exe"
  );
  // Use 'spawn' to open the program
  const child = spawn(programToOpen);

  // Handle any errors
  child.on("error", (error) => {
    console.error("Error:", error);
  });
}

module.exports.lol = abrirLol;
