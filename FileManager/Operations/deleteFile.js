const fs = require("fs");

module.exports = (file) => {
    fs.unlink(file, (err) => {
        if (err) return console.error(err.message);
        console.log("File deleted successfully");
    });
};
