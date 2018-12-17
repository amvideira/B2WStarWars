
var express = require('express'),
    app = express(),
    port = process.env.PORT || 4000,
    mongoose = require('mongoose'),
    StarWarsPlanet = require('./api/models/starWarsModel'),
    bodyParser = require('body-parser');


global.starwarsPlanetsFromSwapi = [];


// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://*****:*****@clusterteste-zsnff.azure.mongodb.net/StarWars'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/starWarsRoutes'); 
routes(app); 


app.listen(port);


console.log('Server iniciado na porta: ' + port);
