cameraApp.controller('browseImagesController', ['$scope', 'authService', '$http', '$location', '$rootScope', '$routeParams', function ($scope, authService, $http, $location, $rootScope, $routeParams) {

    $scope.customerId = $rootScope.customer;
  
    $scope.session = $routeParams.Id;

} ]);