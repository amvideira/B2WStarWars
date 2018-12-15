'use strict';
module.exports = function(app) {
  var starWars = require('../controllers/starWarsController');

  // starWars Routes
  app.route('/starwarsplanets')
    .get(starWars.listAll)
    .post(starWars.createPlanet);


  app.route('/starwarsplanets/:planetId')
    .get(starWars.planetDetails)
    .put(starWars.updatePlanet)
    .delete(starWars.destroyPlanet);

  app.route('/starwarsplanets/findbyName/:name')
    .get(starWars.findPlanetByName);

    
};