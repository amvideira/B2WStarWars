
var mongoose = require('mongoose'),
    Request = require("request"),
  StarWarsPlanet = mongoose.model('StarWarsPlanets');


exports.listAll = function(req, res) {
  StarWarsPlanet.find({}, function (err, planets) {
      if (err)
          res.send(err);

    
    res.json(planets);
  });
};


exports.createPlanet = function(req, res) {
    var new_planet = new StarWarsPlanet(req.body);

    Request.get("https://swapi.co/api/planets/?search=" + new_planet.Name, (error, response, body) => {
        if (error) {

            new_planet.save(function (err, planet) {
                if (err)
                    res.send(err);
                res.json(planet);
            });

        }

        var planet = JSON.parse(body);

        if (planet != null && planet != undefined && planet.results != null && planet.results != undefined && planet.results.length > 0) {
            new_planet.FilmApparitionCount = planet.results[0].films.length;
        }       

        new_planet.save(function (err, planet) {
            if (err)
                res.send(err);
            res.json(planet);
        });       
    });  
};


exports.planetDetails = function(req, res) {
  

  StarWarsPlanet.findById(req.params.planetId, function(err, planet) {
    if (err)
      res.send(err);
    res.json(planet);
  });
};

exports.findPlanetByName = function(req, res) {
    StarWarsPlanet.findOne({ "Name": req.params.name }, function(err, planet) {
    if (err)
      res.send(err);
    res.json(planet);
  });
};


exports.updatePlanet = function(req, res) {
  StarWarsPlanet.findOneAndUpdate({_id: req.params.planetId}, req.body, {new: true}, function(err, planet) {
    if (err)
      res.send(err);
    res.json(planet);
  });
};


exports.destroyPlanet = function(req, res) {
    StarWarsPlanet.deleteOne({
    _id: req.params.planetId
  }, function(err, planet) {
    if (err)
      res.send(err);
    res.json({ message: 'Planeta destruído pelo império!!' });
  });
};