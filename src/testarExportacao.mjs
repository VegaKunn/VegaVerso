const os = require("os-utils");

export default function obterUsoDaCPU() {
  os.cpuUsage(function (v) {
    console.log("Uso de CPU:", v * 100 + "%");
  });
}
