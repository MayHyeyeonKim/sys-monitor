const os = require("os");
const fs = require("fs");
const logFileName = "./logs/app.log";

function logCpuUsage(callback) {
    const cpuUsage = os.cpus();
    const logData = JSON.stringify(cpuUsage, null, 2);

    // 로그 파일에 CPU 정보 추가
    fs.appendFile(logFileName, logData, (err) => {
        if (err) {
            console.error("Error writing to log file:", err);
        }

        // CPU 정보를 전달하기 위해 콜백 함수 호출
        callback(cpuUsage);
    });
}
logCpuUsage((cpuUsageData) => {
    // CPU 정보를 사용하는 로직을 이곳에서 처리
    console.log("CPU Usage Data:", cpuUsageData);
});

// 10초마다 logCpuUsage 함수를 실행하도록 설정
setInterval(() => {
    logCpuUsage((cpuUsageData) => {
        // CPU 정보를 사용하는 로직을 이곳에서 처리
        console.log("CPU Usage Data:", cpuUsageData);
    });
}, 10000);

module.exports = logCpuUsage;

module.exports = logCpuUsage;
