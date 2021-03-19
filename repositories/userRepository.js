const db = require("../models/");

const createUser = (studentName, email, password) => {
  if (studentName && email && password) {
    db.User.create({
      studentName,
      email,
      password
    })
      .then(user => {
        return user;
      })
      .catch(err => {
        throw err;
      });
  }
};

const deleteUser = userId => {
  if (userId) {
    db.User.destroy({
      where: {
        id: userId
      }
    })
      .then(user => {
        return user;
      })
      .catch(err => {
        throw err;
      });
  }
};

const updateUser = (userId, studentName, email) => {
  if (userId && studentName && email) {
    db.User.update(
      {
        studentName,
        email
      },
      {
        where: {
          id: userId
        }
      }
    )
      .then(user => {
        return user;
      })
      .catch(err => {
        throw err;
      });
  }
};

const getUser = userId => {
  if (userId) {
    db.User.findOne({
      where: {
        id: userId
      }
    })
      .then(user => {
        return user;
      })
      .catch(err => {
        throw err;
      });
  }
};

const getUsers = () => {
  db.User.findAll({})
    .then(users => {
      return users;
    })
    .catch(err => {
      throw err;
    });
};

module.exports = {
  createUser: createUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
  getUser: getUser,
  getUsers: getUsers
};
