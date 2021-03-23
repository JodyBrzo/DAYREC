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
    }
  });

  return RecordLog;
};
