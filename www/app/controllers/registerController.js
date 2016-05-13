pushApp.controller('registerController', ['$scope', 'authService', '$http', '$location', '$rootScope', function ($scope, authService, $http, $location, $rootScope) {

    $scope.message = "";

    $scope.registerData = {
        Name: "jeyakumar",
        RegisterId: "",
        Type: "Android"
    }

    $scope.register = function () {
        var registerId= window.localStorage.getItem('RegisterID');
        if (registerId == null || registerId == "") {
            registerId = "test";
            //alert("Notification not enabled");
        }
       

            $scope.registerData.RegisterId = registerId;
            authService.getRegisterByName($scope.registerData).then(function (response) {
           

                $scope.registerData.RegisterId = registerId;
                authService.register($scope.registerData).then(function (response) {
                    alert("Registered Successfully " + response.Id);
                    window.localStorage.setItem('UserID', response.Id);

                },
            function (err) {
                $scope.message = "error";
                alert($scope.message);
            });
            
            },
            function (err) {
                $scope.message = "error";
                alert($scope.message);
            });
       
    }


    $scope.show = function () {

        var registerId = window.localStorage.getItem('RegisterID');
        alert(registerId);
    }

    

}]);