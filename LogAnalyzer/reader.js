const fs = require("fs");
const readline = require("readline");

module.exports = (file, callback) => {
    let counts = { error: 0, warning: 0, info: 0 };

    const rl = readline.createInterface({
        input: fs.createReadStream(file),
        crlfDelay: Infinity
    });

    rl.on("line", line => {
        if (line.includes("ERROR")) counts.error++;
        else if (line.includes("WARNING")) counts.warning++;
        else if (line.includes("INFO")) counts.info++;
    });

    rl.on("close", () => callback(counts));
};
