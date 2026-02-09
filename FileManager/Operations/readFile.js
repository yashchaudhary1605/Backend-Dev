const fs = require("fs");

module.exports = (file) => {
    fs.readFile(file, "utf8", (err, data) => {
        if (err) return console.error(err.message);
        console.log(data);
    });
};
