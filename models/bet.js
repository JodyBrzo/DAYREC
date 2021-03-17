const User = require("../models/user");

// Creating our Bets model
module.exports = function(sequelize, DataTypes) {
  const Bet = sequelize.define("Bet", {
    guessRecord: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    guessRecord: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Bet.belongsTo(User, { foreignKey: "userId" }); // Adds fk userId to Bet
  return Bet;
};
