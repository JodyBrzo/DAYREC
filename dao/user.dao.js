const User = require("../models/user");
const userDao = {
  findAll: findAll,
  create: create,
  findById: findById,
  deleteById: deleteById,
  updateUser: updateUser
};

function findAll() {
  return User.findAll();
}

function findById() {
  return User.findById();
}

function deleteById(id) {
  return User.findByPk(id);
}

function deleteById(id) {
  return User.destroy({ where: { id: id } });
}

function create(user) {
  const newUser = new User(user);
  return newUser.save();
}

function updateUser(user, id) {
  const updateUser = {
    studentName: user.studentName,
    email: user.email,
    password: user.password,
    isAdmin: user.isAdmin
    //add more stuff here if needed
  };
  return User.update(updateUser, { where: { id: id } });
}
module.exports = userDao;

// The idea for this file is to seperate CRUD opperations from the models and the database
// that way it is easier to work on functionality
