'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope',
  function($scope) {
    var fs = require('fs');
    var strFilename = 'data/for_doctor.json';
    var aObj = {};
    if(fs.existsSync( strFilename) ){
      var str_temp = fs.readFileSync(strFilename);
      //console.log("getBooking(): " + strBookingList);
      aObj = JSON.parse(str_temp);
    }
    $scope.datas = aObj;
    
    
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 
  function($scope, $routeParams, $http) {
    

    var fs = require('fs');
    var strFilename = 'data/for_doctor.json';
    var aObj = {};
    if(fs.existsSync( strFilename) ){
      var str_temp = fs.readFileSync(strFilename);
      //console.log("getBooking(): " + strBookingList);
      aObj = JSON.parse(str_temp);
    }
    
    var _ = require("underscore");
    var tempObj = {};
    tempObj = _.find(aObj, function(tObj){ return tObj.patients.patient_no == $routeParams.phoneId; });
    console.log(tempObj);
    $scope.datas = tempObj;


    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);

