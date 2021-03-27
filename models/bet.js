const moment = require("moment");

// Creating our Bets model
module.exports = function(sequelize, DataTypes) {
  const Bet = sequelize.define("Bet", {
    guessRecord: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: -1
    },
    guessShare: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: -1
    },
    awardedCoins: {
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

  Bet.associate = models => {
    Bet.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    }); // Adds fk userId to Bet
  };
  return Bet;
};
