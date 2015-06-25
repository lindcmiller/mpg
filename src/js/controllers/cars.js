'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');

router.route('', 'cars', function () {
  $.ajax({
    url: 'data/mpg.data',
    method: 'GET'
  })
  .then(parseCarsCsv)
  .then(renderCars);

  function parseCarsCsv(carsCsv) {
    return carsCsv
      .split('\n')
      .map(function (record) {
        var cells = record.split(',');
        
        return { 
          id: cells[2],
          fuelType: cells[3],
          aspiration: cells[4],
          bodyStyle: cells[6],
          numOfCylinders: cells[15], 
          horsepower: cells[21],
          cityMpg: cells[23],
          highwayMpg: cells[24]
        };
      });
  }
  
  function renderCars(carsArray) {
    var carsTemplate = views['cars-template'];
    var templateFn = _.template(carsTemplate, { variable: 'm' });
    var carsHTML = templateFn({ cars: carsArray });
    
    $('.main-content').html(carsHTML);
  }
});