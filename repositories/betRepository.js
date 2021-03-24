const Sequelize = require("sequelize");
const db = require("../models/");

const addBet = (user, guessRecord, guessShare) => {
  if (user && guessRecord && guessShare) {
    // Get an existing user bet for today's date.
    return db.Bet.create({
      UserId: user.id,
      guessRecord,
      guessShare
    });
  }
};

//get bet for today
const getBet = user => {
  const Op = Sequelize.Op;
  const todaysDate = new Date();
  todaysDate.setHours(0, 0, 0, 0); // Set time for 12:00AM

  return db.Bet.findOne({
    where: {
      UserId: user.id,
      createdAt: {
        [Op.gte]: todaysDate
      }
    }
  });
};

//returns the total coins for the user
const getBetsTotalCoins = user => {
  return db.Bet.sum("awardedCoins", {
    where: {
      userId: user.id
    }
  });
};

//returns all the users and their bets
const getAllUsersWithBets = () => {
  return db.User.findAll({
    include: {
      model: db.Bet
    }
  });
};

//returns all the users and their bets
const getAllBets = () => {
  return db.Bet.findAll();
};

const getBets = user => {
  return db.Bet.findAll({
    where: {
      UserId: user.id
    }
  });
};

//update the actual record and share by id
const updateBetAwardedCoins = (betId, awardedCoins) => {
  return db.Bet.update(
    {
      awardedCoins
    },
    {
      where: {
        id: betId
      }
    }
  );
};

module.exports = {
  addBet: addBet,
  getBet: getBet,
  getBetsTotalCoins: getBetsTotalCoins,
  getAllUsersWithBets: getAllUsersWithBets,
  getBets: getBets,
  getAllBets: getAllBets,
  updateBetAwardedCoins: updateBetAwardedCoins
};
