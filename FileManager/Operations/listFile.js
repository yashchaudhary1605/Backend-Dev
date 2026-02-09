const fs = require("fs");

module.exports = (dir = ".") => {
    fs.readdir(dir, (err, files) => {
        if (err) return console.error(err.message);
        files.forEach(f => console.log(f));
    });
};
