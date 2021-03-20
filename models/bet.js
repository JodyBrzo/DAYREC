// Creating our Bets model
module.exports = function(sequelize, DataTypes) {
  const Bet = sequelize.define("Bet", {
    guessRecord: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    guessShare: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    awardedCoins: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });

  Bet.associate = models => {
    Bet.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    }); // Adds fk userId to Bet
  };
  return Bet;
};
