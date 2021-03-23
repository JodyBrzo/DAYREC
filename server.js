global.systemStatus = undefined;

// Requiring necessary npm package
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
// Requiring passport as we've configured it
const passport = require("./config/passport");
const path = require("path");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8083;
const db = require("./models");

const systemStatusRepo = require("./repositories/systemStatusRepository");
global.systemStatus = systemStatusRepo.getAllowBetStatus();

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
//Middleware for user authentication
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.login = req.isAuthenticated();
  next();
});

// Delete two lines below if not needed
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Handlebars views
app.set("views", path.join(__dirname, "views"));
app.engine(
  "handlebars",
  exphbs.create({
    defaultLayout: "main",
    layoutsDir: app.get("views") + "/layouts",
    partialsDir: app.get("views") + "/partials"
  }).engine
);
app.set("view engine", "handlebars");

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
