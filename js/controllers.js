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

    var bObj = [];
    for( var i=0; i<aObj.length; i++){
        var p_obj = aObj[i];
        if( p_obj.patients  ){
            bObj.push(p_obj);
        }
    }
    
    var _ = require("underscore");
    var tempObj = {};
    tempObj = _.find(bObj, function(tObj){ return tObj.patients.patient_no == $routeParams.phoneId; });
    console.log(tempObj);
    $scope.datas = tempObj;
    $scope.mainImageUrl = "img/" + tempObj.cases[0].images[0];
    $scope.current_recipe = tempObj.cases[0];


    $scope.setImage = function(imageUrl, caseObj ) {
      $scope.mainImageUrl = imageUrl;
      //alert(caseObj.case_no);
      $scope.current_recipe = caseObj ;

    }

    $scope.to_Date = function(obj){
      var c_no = obj.case_no;
      var idx = c_no.indexOf("_");
      var str_date = c_no.substring(0,idx);
      var date_date = new Date(str_date);
      //console.log(date_date);
      
      return date_date;
    }
  }]);

