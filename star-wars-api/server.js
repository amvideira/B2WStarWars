/*var express = require('express'),
  app = express(),
  port = process.env.PORT || 4000;

app.listen(port);

console.log('Server iniciado na porta: ' + port);
*/

var express = require('express'),
    app = express(),
    port = process.env.PORT || 4000,
    Request = require("request"),
    mongoose = require('mongoose'),
    StarWarsPlanet = require('./api/models/starWarsModel'),
    bodyParser = require('body-parser');


global.starwarsPlanetsFromSwapi = [];

app.use(function (req, res, next) {
    
    if (global.starwarsPlanetsFromSwapi == null || global.starwarsPlanetsFromSwapi.length == 0) {
        Request.get("https://swapi.co/api/planets", (error, response, body) => {
            if (error) {
                return console.log(error);
            }

            global.starwarsPlanetsFromSwapi = JSON.parse(body);

            //console.log(body);
        });
    }
    next();
});
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://TesteGmap:Greatlasher01!!@clusterteste-zsnff.azure.mongodb.net/StarWars'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/starWarsRoutes'); 
routes(app); 


app.listen(port);


console.log('Server iniciado na porta: ' + port);