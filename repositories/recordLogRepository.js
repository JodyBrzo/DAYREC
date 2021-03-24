const Sequelize = require("sequelize");
const db = require("../models/");
const Op = Sequelize.Op;

const addRecordLog = (actualRecord, actualShare) => {
  return db.RecordLog.create({
    actualRecord,
    actualShare
  });
};

//get RecordLog for today
const getRecordLog = () => {
  const todaysDate = new Date();
  todaysDate.setHours(0, 0, 0, 0); // Set time for 12:00AM

  return db.RecordLog.findOne({
    where: {
      createdAt: {
        [Op.gte]: todaysDate
      }
    }
  });
};

//returns all the Record Logs and sorts ascending by createdAt
const getAllRecordLogs = () => {
  return db.RecordLog.findAll({
    order: ["createdAt"]
  });
};

//update the actual record and share by id
const updateActualRecordLog = (recordId, actualRecord, actualShare) => {
  return db.RecordLog.update(
    {
      actualRecord,
      actualShare
    },
    {
      where: {
        id: recordId
      },
      returning: true,
      plain: true
    }
  );
};

// //update the actual share by id
// const updateActualShare = (recordId, actualShare) => {
//   if (id && actualShare) {
//     return db.RecordLog.update(
//       {
//         actualShare
//       },
//       {
//         where: {
//           id: recordId
//         }
//       }
//     );
//   }
// };

module.exports = {
  addRecordLog: addRecordLog,
  getRecordLog: getRecordLog,
  getAllRecordLogs: getAllRecordLogs,
  updateActualRecordLog: updateActualRecordLog
};
