const express = require("express");
const router = express.Router();
const logCpuUsage = require("../monitoring/logCpuUsage");

router.get("/", (req, res) => {
    // logCpuUsage 함수에 콜백 함수를 전달하여 CPU 정보를 처리
    logCpuUsage((cpuUsageData) => {
        res.json(cpuUsageData); // CPU 정보를 JSON 형식으로 응답
    });
});

module.exports = router;
