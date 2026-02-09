const fs = require("fs");

module.exports = (src, dest) => {
    fs.copyFile(src, dest, (err) => {
        if (err) return console.error(err.message);
        console.log("File copied successfully");
    });
};
