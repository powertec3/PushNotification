cameraApp.controller('mainController', ['$scope', 'authService', '$http', '$location', '$rootScope', function ($scope, authService, $http, $location, $rootScope) {

    $scope.customerId = $rootScope.customer;

    $scope.goCamera = function () {

        $location.path("/Camera");
    }

    $scope.browseImages = function () {

        $location.path("/Session");
    }

} ]);