const user = require("../controllers/user-controller.js");
const urlBase = "/user"
module.exports = app => {
    
  app.post(`${urlBase}/`, user.userCreate);
  
  app.post(`${urlBase}/login`, user.loginUser);
};