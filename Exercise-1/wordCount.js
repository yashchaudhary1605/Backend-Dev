const fs = require('fs');

fs.readFile('Exercise-1/input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const words = data.trim().split(/\s+/);
  const count = words.length;

  const result = `Total number of words: ${count}`;

  fs.writeFile('Exercise-1/output.txt', result, (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    console.log("Word count written to output.txt");
  });
});
