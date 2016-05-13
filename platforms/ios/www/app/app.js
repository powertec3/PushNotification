
var cameraApp = angular.module('cameraApp', ['ngRoute']);

cameraApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/Home', {
            templateUrl: 'app/views/login.html',
            //controller: 'HomeCtrl'
            controller: 'loginController'
        })

         .when('/Camera', {
             templateUrl: 'app/views/camera.html',
             //controller: 'HomeCtrl'
             controller: 'cameraController'
         })
         .when('/Client', {
             templateUrl: 'app/views/client.html',
             //controller: 'HomeCtrl'
             controller: 'clientController'
         })
         .when('/Main', {
             templateUrl: 'app/views/main.html',
             //controller: 'HomeCtrl'
             controller: 'mainController'
         })
          .when('/Browse/:Id?', {
              templateUrl: 'app/views/browseImages.html',
              //controller: 'HomeCtrl'
              controller: 'browseImagesController'
          })
            .when('/Session', {
                templateUrl: 'app/views/session.html',
                //controller: 'HomeCtrl'
                controller: 'sessionController'
            })
        
    .otherwise({
        templateUrl: 'app/views/login.html',
        //controller: 'HomeCtrl'
        controller: 'loginController'
    });

   
   

});



cameraApp.run(function ($rootScope) {
    $rootScope.client = '';

    $rootScope.brandcode = 'NYSS';
    $rootScope.brandid = 'SG01';
    $rootScope.consultant = '';
    $rootScope.customer = '';
    //$rootScope.serverip = 'http://172.0.6.168:8080/save_camera_image';
    $rootScope.imageuploadip = 'http://172.0.6.168:8080/save_camera_image';
    $rootScope.gigatronserviceip = 'http://172.0.2.85:1337/clients';
    $rootScope.aesloginip = 'http://192.168.1.99:8006/';
});

//var serviceBase = 'http://testsvr.eurogrp.com:8006/';
var serviceBase = 'http://192.168.1.99:8006/';
var uploadUrl = 'http://172.0.6.168:8080/save_camera_image'; 
//http://172.0.2.85:8080/save_camera_image'

cameraApp.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    uploadServiceUri:uploadUrl
});


