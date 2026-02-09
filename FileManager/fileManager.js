const readFile = require("./Operations/readFile");
const writeFile = require("./Operations/writeFile");
const copyFile = require("./Operations/copyFile");
const deleteFile = require("./Operations/deleteFile");
const listFiles = require("./Operations/listFiles");

const [,, command, ...args] = process.argv;

switch (command) {
    case "read":
        readFile(args[0]);
        break;
    case "write":
        writeFile(args[0], args[1]);
        break;
    case "copy":
        copyFile(args[0], args[1]);
        break;
    case "delete":
        deleteFile(args[0]);
        break;
    case "list":
        listFiles(args[0]);
        break;
    default:
        console.log("Invalid command");
}
