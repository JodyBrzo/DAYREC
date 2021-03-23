const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const db = require("../models/");

const addRecordLog = (actualRecord, actualShare) => {
  if (actualRecord && actualShare) {
    db.RecordLog.create({
      actualRecord,
      actualShare
    })
      .then(recordLog => {
        return recordLog;
      })
      .catch(err => {
        throw err;
      });
  }
};

//get RecordLog for today
const getRecordLog = () => {
  db.RecordLog.findOne({
    where: {
      createdAt: {
        [Op.gte]: new Date()
      }
    }
  })
    .then(recordLog => {
      return recordLog;
    })
    .catch(err => {
      throw err;
    });
};

//returns all the Record Logs and sorts ascending by createdAt
const getAllRecordLogs = () => {
  db.RecordLog.findAll({
    order: ["createdAt"]
  })
    .then(recordLog => {
      return recordLog;
    })
    .catch(err => {
      throw err;
    });
};

//update the actual record by id
const updateActualRecord = (recordId, actualRecord) => {
  if (id && actualRecord) {
    db.RecordLog.update(
      {
        actualRecord
      },
      {
        where: {
          id: recordId
        }
      }
    )
      .then(recordLog => {
        return recordLog;
      })
      .catch(err => {
        throw err;
      });
  }
};

//update the actual share by id
const updateActualShare = (recordId, actualShare) => {
  if (id && actualShare) {
    db.RecordLog.update(
      {
        actualShare
      },
      {
        where: {
          id: recordId
        }
      }
    )
      .then(recordLog => {
        return recordLog;
      })
      .catch(err => {
        throw err;
      });
  }
};

module.exports = {
  addRecordLog: addRecordLog,
  getRecordLog: getRecordLog,
  getAllRecordLogs: getAllRecordLogs,
  updateActualRecord: updateActualRecord,
  updateActualShare: updateActualShare
};
