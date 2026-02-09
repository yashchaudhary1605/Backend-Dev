const fs = require("fs");
const path = require("path");

module.exports = (source, target) => {

    if (!fs.existsSync(target)) {
        fs.mkdirSync(target);
    }

    const files = fs.readdirSync(source);

    files.forEach(file => {
        const srcPath = path.join(source, file);
        const tgtPath = path.join(target, file);

        try {
            const srcStat = fs.statSync(srcPath);

            if (srcStat.isFile()) {
                if (!fs.existsSync(tgtPath) ||
                    srcStat.mtime > fs.statSync(tgtPath).mtime) {
                    fs.copyFileSync(srcPath, tgtPath);
                    console.log(`Synced: ${file}`);
                }
            }
        } catch (err) {
            console.error(err.message);
        }
    });
};
