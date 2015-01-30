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

    $scope.noZero = function(obj){
      //return true; //
      return obj.cases.length > 0;
    };
    
    
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
    //console.log(tempObj);
    $scope.datas = tempObj;
    if(tempObj.cases[0].images){
      $scope.mainImageUrl = "img/" + tempObj.cases[0].images[0];
    }
    //$scope.mainImageUrl = "img/" + tempObj.cases[0].images[0];
    $scope.current_recipe = tempObj.cases[0];

    $scope.old_case_flag = true;
    $scope.setImage = function(imageUrl, caseObj ) {
      $scope.mainImageUrl = imageUrl;
      //alert(caseObj.case_no);
      $scope.current_recipe = caseObj ;
      $scope.old_case_flag = true;
    };

    $scope.setCase = function( caseObj ) {
      $scope.current_recipe = caseObj ;
      $scope.old_case_flag = false;
    };

    $scope.to_Date = function(obj){
      var c_no = obj.case_no;
      var idx = c_no.indexOf("_");
      var str_date = c_no.substring(0,idx);
      var date_date = new Date(str_date);
      //console.log(date_date);
      
      return date_date;
    };

    $scope.goPrint = function(img_url){
      window.open("print.html?" + img_url 
                , "Print", "width=630,height=820,location=no,directories=no,menubar=no,resizable=no,toolbar=no");
    };

    $scope.go_print2 = function(){
        var obj = document.getElementById('id_chufang');

        //打开一个新窗口newWindow
        var newWindow=window.open("打印窗口","w_print");
        //要打印的div的内容
        var docStr = "<link rel='stylesheet' href='css/app.css'>" + obj.innerHTML ;
        //打印内容写入newWindow文档
        newWindow.document.write(docStr);
        //关闭文档
        newWindow.document.close();
        
        setTimeout(function(){
                          //调用打印机
                          newWindow.print();
                          //关闭newWindow页面
                          newWindow.close();
                        }, 1000);

    };

  }]);

