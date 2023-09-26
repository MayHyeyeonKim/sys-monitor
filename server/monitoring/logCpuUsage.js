const os = require("os");
const fs = require("fs");
const logFileName = "./logs/app.log";

function logCpuUsage() {
    const cpuUsage = os.cpus();
    const logData = JSON.stringify(cpuUsage, null, 2);

    // 로그 파일에 CPU 정보 추가
    fs.appendFile(logFileName, logData, (err) => {
        if (err) {
            console.error("Error writing to log file:", err);
        }
    });
    return cpuUsage;
}

module.exports = logCpuUsage;
