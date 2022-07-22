module.exports = app => {

  require("./user-route")(app);
  require("./auth-route")(app);
  require("./tracks-route")(app);

};