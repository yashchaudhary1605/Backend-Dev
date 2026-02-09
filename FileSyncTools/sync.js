const syncFiles = require("./syncFiles");

const [,, source, target] = process.argv;

if (!source || !target) {
    console.log("Usage: node sync.js <sourceDir> <targetDir>");
    process.exit(1);
}

syncFiles(source, target);
