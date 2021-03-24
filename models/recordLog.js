const moment = require("moment");

// Creating our recordLog model
module.exports = function(sequelize, DataTypes) {
  const RecordLog = sequelize.define("RecordLog", {
    actualRecord: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    actualShare: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    createdAt: {
      type: DataTypes.DATE,
      get() {
        const created = moment(this.getDataValue("createdAt")).format(
          "YYYY-MM-DD"
        );
        //created = moment(created).toDate();
        return created;
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        const updated = moment(this.getDataValue("updatedAt")).format(
          "YYYY-MM-DD"
        );
        //updated = moment(created).toDate();
        return updated;
      }
    }
  });

  return RecordLog;
};
