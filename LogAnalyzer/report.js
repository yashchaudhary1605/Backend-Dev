module.exports = (counts) => {
    console.log("Log Summary Report");
    console.log("------------------");
    console.log("Errors   :", counts.error);
    console.log("Warnings :", counts.warning);
    console.log("Info     :", counts.info);
};
