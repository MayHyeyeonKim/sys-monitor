const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const fs = require("fs");
const winston = require("winston");
const logCpuUsage = require("./monitoring/logCpuUsage"); // 모듈을 가져옴

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const logFileName = "app.log"; // 로그 파일 이름
const logFilePath = "./logs"; // 로그 파일 경로

app.use(express.static("views"));

// 로깅 설정
const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [
        new winston.transports.File({ filename: logFilePath + logFileName }),
    ],
});

// 로그 파일 모니터링
fs.watchFile(logFilePath + logFileName, () => {
    // 로그 파일 변경 시 로그 데이터를 읽어서 클라이언트로 전송
    fs.readFile(logFilePath + logFileName, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading log file:", err);
            return;
        }
        // 클라이언트로 로그 데이터를 전송
        io.emit("log", data);
    });
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    console.log("Client connected");

    // 클라이언트 연결 시 현재 로그 파일 내용을 전송
    fs.readFile(logFilePath + logFileName, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading log file:", err);
            return;
        }
        socket.emit("log", data);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
    setInterval(() => {
        const cpuUsageData = logCpuUsage(); // CPU 정보를 가져옴
        socket.emit("cpuUsage", cpuUsageData);
    }, 10000);
});

server.listen(3000, () => {
    console.log("서버가 3000 포트에서 실행 중입니다.");
});
