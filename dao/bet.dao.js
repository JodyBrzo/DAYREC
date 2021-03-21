const Bet = require("../models/bet");
const betDao = {
  findAll: findAll,
  create: create,
  findById: findById,
  deleteById: deleteById,
  updateBet: updateBet
};

function findAll() {
  return Bet.findAll();
}

function findById() {
  return Bet.findById();
}

function deleteById(id) {
  return Bet.findByPk(id);
}

function deleteById(id) {
  return Bet.destroy({ where: { id: id } });
}

function create(bet) {
  const newBet = new Bet(bet);
  return newBet.save();
}

function updateBet(bet, id) {
  const updateBet = {
    guessRecord: bet.guessRecord,
    guessShare: guessShare
    //add more stuff here if needed
  };
  return Bet.update(updateBet, { where: { id: id } });
}
module.exports = betDao;

// The idea for this file is to seperate CRUD opperations from the models and the database
// that way it is easier to work on functionality
