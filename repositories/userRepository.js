const db = require("../models/");

const createUser = (studentName, email, password) => {
  return db.User.create({
    studentName,
    email,
    password
  });
};

const deleteUser = userId => {
  return db.User.destroy({
    where: {
      id: userId
    }
  });
};

const updateUser = (userId, studentName, email) => {
  return db.User.update(
    {
      studentName,
      email
    },
    {
      where: {
        id: userId
      }
    }
  );
};

//returns ONE user: id, name, email, createdAt and updatedAt
const getUser = userId => {
  return db.User.findOne({
    attributes: ["id", "studentName", "email", "createdAt", "updatedAt"],
    where: {
      id: userId
    }
  });
};

//returns ALL users: id, name, email, createdAt and updatedAt
const getUsers = () => {
  return db.User.findAll({
    attributes: ["id", "studentName", "email", "createdAt", "updatedAt"]
  });
};

module.exports = {
  createUser: createUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
  getUser: getUser,
  getUsers: getUsers
};
