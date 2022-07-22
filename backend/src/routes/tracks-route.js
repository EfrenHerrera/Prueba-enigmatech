const traks = require("../controllers/track-controller.js");
const urlBase = "/tracks"

module.exports = app => {
  app.post(`${urlBase}/addFavorite`, traks.addFavorite);
  app.get(`${urlBase}/:id`, traks.findAllUser);
  app.delete(`${urlBase}/:id`, traks.deleteTrackFavorite);
  app.put(`${urlBase}/:id`, traks.updateTrackFavorite);
};