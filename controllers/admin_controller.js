const express = require("express");
const router = express.Router();

const systemStatusRepo = require("../repositories/systemStatusRepository");
const recordLogRepo = require("../repositories/recordLogRepository");

module.exports = () => {
  router.put("/api/allowBets", (req, res) => {
    if (req.user.isAdmin) {
      systemStatusRepo.setAllowBetStatus(
        req.body.allowBetStatus //admin field should be called allowBetStatus
      );
      if (parseBoolean(req.body.allowBetStatus)) {
        const recordLogToday = recordLogRepo.getRecordLog();
        if (!recordLogToday) {
          recordLogToday = recordLogRepo.addRecordLog(0, 0);
        }
        res.json(recordLogToday);
      }
      res.status(200);
    } else {
      res.status(405);
    }
  });

  router.put("/api/setActualRecord", (req, res) => {
    if (req.user.isAdmin) {
      const recordLog = recordLogRepo.updateActualRecord(
        req.body.recordId,
        req.body.actualRecord
      );
      res.json(recordLog);
    } else {
      res.status(405);
    }
  });

  router.put("/api/setActualShare", (req, res) => {
    if (req.user.isAdmin) {
      const recordLog = recordLogRepo.updateActualShare(
        req.body.recordId,
        req.body.actualShare
      );
      res.json(recordLog);
    } else {
      res.status(405);
    }
  });

  router.get("/api/recordLogs", (req, res) => {
    if (req.user.isAdmin) {
      const recordLogs = recordLogRepo.getAllRecordLogs();
      res.json(recordLogs);
    } else {
      res.status(405);
    }
  });

  const parseBoolean = string => {
    const bool = (() => {
      switch (false) {
        case string.toLowerCase() !== "true":
          return true;
        case string.toLowerCase() !== "false":
          return false;
      }
    })();
    if (typeof bool === "boolean") {
      return bool;
    }
    return void 0;
  };
};
