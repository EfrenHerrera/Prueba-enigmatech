const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
var logger = require('morgan');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
var corsOptions = {
  origin: "http://localhost:8000"
};
app.use(cors(corsOptions));

  /* Init DB */
  const db = require("./config/db/postgres");
  db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

  /* Routes */
  require("./routes/index")(app);

const PORT = process.env.PORT || 8080;

var httpServer = require('http').createServer(app);
httpServer.listen(PORT);