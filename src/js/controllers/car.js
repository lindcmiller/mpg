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
        
        return { //change these:
          // id: cells[0],
          // erected: cells[3],
          // lanes: cells[6],
          // material: cells[9],
          // type: cells[12]
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