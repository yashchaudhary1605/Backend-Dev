const readLogs = require("./reader");
const generateReport = require("./report");

const file = process.argv[2];

if (!file) {
    console.log("Usage: node analyzer.js <logfile>");
    process.exit(1);
}

readLogs(file, generateReport);
