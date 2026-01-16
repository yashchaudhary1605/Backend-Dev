const fs = require('fs');
const os = require('os');

function logSystemInfo() {
  const info = `
Time: ${new Date().toLocaleString()}
Platform: ${os.platform()}
CPU Cores: ${os.cpus().length}
Total Memory: ${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB
Free Memory: ${(os.freemem() / (1024 ** 3)).toFixed(2)} GB
-----------------------------
`;

  fs.appendFile('Exercise-3/systemLog.txt', info, (err) => {
    if (err) {
      console.error("Error writing log:", err);
    } else {
      console.log("System info logged.");
    }
  });
}

setInterval(logSystemInfo, 5000);
