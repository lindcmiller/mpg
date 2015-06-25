'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');

router.route('cars/:id', function (carId) {
  $.ajax({
    url: 'data/mpg.data',
    method: 'GET'
  })
  .then(parseCarsCsv)
  .then(renderCar);

  function parseCarsCsv(CarsCsv) {
    return CarsCsv
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
  
  function renderCar(CarsArray) {
    var car = _.findWhere(CarsArray, { id: CarId });
    var carTemplate = views['car-template'];
    var templateFn = _.template(carTemplate, { variable: 'm' });
    var carHTML = templateFn(car);
    
    $('.main-content').html(carHTML);
  }
});