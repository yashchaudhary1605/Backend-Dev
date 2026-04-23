const { exec } = require("child_process");

const backupDB = () => {
  const command = "mongodump --db edulearn --out backups/";

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Backup failed:", error);
      return;
    }
    console.log("Backup successful");
  });
};

module.exports = { backupDB };