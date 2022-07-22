const auth = require("../controllers/auth-controller.js");
const urlBase = "/auth"

module.exports = app => {
  app.post(`${urlBase}/login`, auth.loginUser);
  app.get(`${urlBase}/callback`, auth.callBack);
  app.get(`${urlBase}/token`, auth.getToken);
};