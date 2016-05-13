
var pushApp = angular.module('pushApp', ['ngRoute']);

pushApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/Home', {
            templateUrl: 'app/views/register.html',
            //controller: 'HomeCtrl'
            controller: 'registerController'
        })

      
    .otherwise({
        templateUrl: 'app/views/register.html',
        //controller: 'HomeCtrl'
        controller: 'registerController'
    });

});



pushApp.run(function ($rootScope) {
    $rootScope.client = '';

    $rootScope.brandcode = 'NYSS';
    $rootScope.brandid = 'SG01';
    $rootScope.consultant = '';
    $rootScope.customer = '';
    $rootScope.serverip = 'http://localhost:81/api/Register';
   
});


var serviceBase = 'http://172.0.2.85:81/api/Register';


pushApp.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    
});


