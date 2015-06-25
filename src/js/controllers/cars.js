'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');

router.route('', 'cars', function () {
  $.ajax({
    url: 'data/cars.data',
    method: 'GET'
  })
  .then(parseCarsCsv)
  .then(renderCars);

  function parseCarsCsv(CarsCsv) {
    return carsCsv
      .split('\n')
      .map(function (record) {
        var cells = record.split(',');
        
        return { 
          id: cells[2],
          fuel-type: cells[3],
          aspiration: cells[4],
          body-style: cells[6],
          num-of-cylinders: cells[15], 
          horsepower: cells[21],
          city-mpg: cells[23],
          highway-mpg: cells[24]
        };
      });
  }
  
  function renderCars(CarsArray) {
    var carsTemplate = views['cars-template'];
    var templateFn = _.template(carsTemplate, { variable: 'm' });
    var carsHTML = templateFn({ cars: carsArray });
    
    $('.main-content').html(carsHTML);
  }
});