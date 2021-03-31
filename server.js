global.systemStatus = undefined;

// Requiring necessary npm package
const express = require("express");
const session = require("express-session");
const handlebars = require("express-handlebars");
// Requiring passport as we've configured it
const passport = require("./config/passport");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT|| 8080;

const db = require("./models");

const systemStatusRepo = require("./repositories/systemStatusRepository");
global.systemStatus = systemStatusRepo.getAllowBetStatus();
global.systemStatus = systemStatusRepo.setAllowBetStatus(false);

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: false, cookie: { _expires: (300 * 60 * 1000) } })
);
app.use(passport.initialize());
app.use(passport.session());

// Import controllers
require("./controllers/admin_controller.js")(app);
require("./controllers/bets_controller.js")(app);
require("./controllers/users_controller.js")(app);

//Sets our app to use the handlebars engine
app.set("view engine", "handlebars");

// Setup Handlebars Engine
app.engine(
  "handlebars",
  handlebars({
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    extname: "handlebars",
    defaultLayout: "main"
  })
);

app.use((req, res, next) => {
  res.locals.isNotRoot = req.url !== "/";
  next();
});

// Requiring our routes
require("./routes/html-routes.js")(app);

// Syncing our database and logging a message to the user upon success
app.listen(PORT, () => 
  console.log(`Server listening on: http://localhost:${PORT}`)
);

// db.sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(
//       "Listening on port %s. Visit http://localhost:%s/ in your browser.",
//       PORT,
//       PORT
//     );
//   });
// });
