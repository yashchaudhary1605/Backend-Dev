import fs from "fs";
import path from "path";

const logFilePath = path.join("logs.txt");

const requestLogger = (req, res, next) => {
  const start = Date.now();

  // When response is finished
  res.on("finish", () => {
    const end = Date.now();
    const responseTime = end - start;

    const log = `${new Date().toISOString()} | ${req.method} | ${req.originalUrl} | ${res.statusCode} | ${responseTime}ms\n`;

    fs.appendFile(logFilePath, log, (err) => {
      if (err) {
        console.error("Error writing log:", err);
      }
    });
  });

  next();
};

export default requestLogger;