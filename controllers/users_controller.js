const passport = require("../config/passport");
const userRepo = require("../repositories/userRepository");

module.exports = app => {
  // when user logs on we send you back the student name
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json({ studentName: req.user.studentName });
  });

  //when a user signs up we create the user and send back studentName
  app.post("/api/signup", (req, res) => {
    userRepo
      .createUser(req.body.studentName, req.body.email, req.body.password)
      .then(user => {

        req.login(user, function(err) {
          if (err) {
            console.log(err);
          }
        });

        res.json({ studentName: userDb.studentName });
        console.log(user);
      })
      .catch(err => {
        res.json(err);
      });
  });

  //get 1 user - not in use at the moment
  app.get("/api/user", (req, res) => {
    userRepo
      .getUser(req.query.userId)
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        res.json(err);
      });
  });

  //get all users - not in use at the moment
  app.get("/api/users", (req, res) => {
    userRepo
      .getUsers()
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        res.json(err);
      });
  });
};
