// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var session = require("express-session");
var passport = require("./config/passport");
// Sets up the Express App
// =============================================================
var app = express();

// Requiring our models for syncing
var db = require("./models");
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Static directory
app.use(express.static("public"));
app.use(express.static(__dirname + "/public/assets/css"));
app.use(express.static(__dirname + "/public/assets/js"));

app.use(express.static(__dirname + "/public/assets/img"));




// Routes
// =============================================================
require("./routes/html-routes.js")(app);
// require("./routes/author-api-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});