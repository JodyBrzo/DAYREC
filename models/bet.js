// Creating our Bets model
module.exports = function(sequelize, DataTypes) {
  const Bet = sequelize.define("Bet", {
    guessRecord: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    guessShare: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Bet.associate = models => {
    Bet.belongsTo(models.User, { foreignKey: "userId" }); // Adds fk userId to Bet
  };
  return Bet;
};
