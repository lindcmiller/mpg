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
        
        return { //change these:
          // id: cells[0],
          // erected: cells[3],
          // lanes: cells[6],
          // material: cells[9],
          // type: cells[12]
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