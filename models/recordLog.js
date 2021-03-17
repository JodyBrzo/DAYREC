// Creating our recordLog model
module.exports = function(sequelize, DataTypes) {
  const RecordLog = sequelize.define("RecordLog", {
    actualRecord: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    actualRecord: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return RecordLog;
};
