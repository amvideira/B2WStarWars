var Request = require("request");
var mongoose = require('mongoose'),
  StarWarsPlanet = mongoose.model('StarWarsPlanets');

exports.findElement = function(arr, propName, propValue) {
    for (var i = 0; i < arr.length; i++)
        if (arr[i][propName] == propValue)
            return arr[i];
}

exports.listAll = function(req, res) {

  //console.log(global.starwarsPlanetsFromSwapi);
  StarWarsPlanet.find({}, function (err, planet) {
      if (err)
          res.send(err);

      if (global.starwarsPlanetsFromSwapi != null && global.starwarsPlanetsFromSwapi.count > 0) {
          for (var myKey in planet) {

              var planetFromSwapi = exports.findElement(global.starwarsPlanetsFromSwapi.results, "name"
                  , planet[myKey].Name);

              if (planetFromSwapi != null) {
                  var i = planetFromSwapi.films.length;

                  planet[myKey].FilmApparitionCount = i;
              }
          }

          //console.log("key:" + myKey + ", value:" + planet[myKey].Name);
    }
    res.json(planet);
  });
};




exports.createPlanet = function(req, res) {
  var new_planet = new StarWarsPlanet(req.body);
  new_planet.save(function(err, planet) {
    if (err)
      res.send(err);
    res.json(planet);
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

  exports.getStarWarsPlanetsFromSwapi();


  //StarWarsPlanet.findOne(req.params.planetId, function(err, planet) {
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


  StarWarsPlanet.remove({
    _id: req.params.planetId
  }, function(err, planet) {
    if (err)
      res.send(err);
    res.json({ message: 'Planeta destruído pelo império!!' });
  });
};