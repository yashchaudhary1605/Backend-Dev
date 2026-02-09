const fs = require("fs");

module.exports = (file, content) => {
    fs.writeFile(file, content, (err) => {
        if (err) return console.error(err.message);
        console.log("File written successfully");
    });
};
