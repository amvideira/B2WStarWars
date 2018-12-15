'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var StarWarsPlanetsSchema = new Schema({
  Name: {
    type: String,
    required: 'Digite o nome do planeta'
  },
  ClimeType: {
    type: String,
    required: 'Digite o tipo de clima'
  },
  TerrainType: {
    type: String,
    required: 'Digite o tipo de terreno'
    },
    FilmApparitionCount: {
        type: Number
    }
  /*,
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }*/
});

module.exports = mongoose.model('StarWarsPlanets', StarWarsPlanetsSchema);