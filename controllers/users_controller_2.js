const express = require("express");
const userDao = require("../dao/user.dao");
const user = require("../models/user");
const router = express.Router();

const userController = {
  addUser: addUser,
  findUsers: findUsers,
  findUserById: findUserById,
  updateUser: updateUser,
  deleteById: deleteById,
};

function addUser(req, res) {
  const user = req.body;
  userDao
    .create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function findUserById(req, res) {
  userDao
    .findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteById(req, res) {
  userDao
    .deleteById(req.params.id)
    .then((data) => {
      res.status(200).json({
        message: "User deleted successfully",
        user: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateUser(req, res) {
  userDao
    .updateUser(req.body, req.params.id)
    .then((data) => {
      res.status(200).json({
        message: "User updated successfully",
        user: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function findUsers(req, res) {
  userDao
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = userController;

// module.exports = () => {
//   // Get all data from database
//   router.post("/api/signup", (req, res) => {
//     const user = userRepo.createUser(
//       req.body.studentName,
//       req.body.email,
//       req.body.password
//     );
//     res.json(user);
//   });

//   //get 1 user
//   router.get("/api/user", (req, res) => {
//     const user = userRepo.getUser(req.query.userId);
//     res.json(user);
//   });

//   //get all users
//   router.get("/api/users", (req, res) => {
//     const users = userRepo.getUsers();
//     res.json(users);
//   });
// };
