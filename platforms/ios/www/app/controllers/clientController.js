cameraApp.controller('clientController', ['$scope', 'authService', '$http', '$location', '$rootScope', function ($scope, authService, $http, $location, $rootScope) {



//    $scope.loginData = {
//        UserId: "",
//        Password: "",
//        
    //    };

  $scope.loginData = {
       CompanyID: "",
       CustomerID: "CNX1",
        
    };

    $scope.message = "";

    //$scope.scanQR = function () {
    //    alert("scan starting...");
    //    cordova.plugins.barcodeScanner.scan(
    //      function (result) {


    //          if (result.cancelled == false) {
    //              try {
    //                  var barcode = result.text;
    //                  var code = barcode.split(";");
    //                  var brandcode = code[0];
    //                  var brandid = code[1];
    //                  var consultant = code[2];
    //                  var customer = code[3];
    //                  var imageuploadip = code[4];
    //                  var gigatronserviceip = code[5];
    //                  var aesloginip = code[6];

    //                  //alert(consultant + " " + customer + " " + server);
    //                  $rootScope.brandcode = brandcode;
    //                  $rootScope.brandid = brandid;
    //                  $rootScope.consultant = consultant;
    //                  $rootScope.customer = customer;
    //                  $rootScope.imageuploadip = imageuploadip;
    //                  $rootScope.gigatronserviceip = gigatronserviceip;
    //                  $rootScope.aesloginip = aesloginip;

                      

    //                  $location.path("/Main");
    //              }
    //              catch (err) {
    //                  alert("Error getting barcode");
    //              }
    //          }
    //      },
    //      function (error) {
    //          alert("Scanning failed: " + error);
    //      }
    //   );
    //}

 

    $scope.login = function () {

        //$scope.loginData.CompanyID = $rootScope.brandid
        $scope.loginData.CompanyID = "SG01";
    authService.loginCustomer($scope.loginData).then(function (response) {
       
    if (response.isExist == false) {
           alert("User Not  Exists");
              
      }
    else {
                
          $rootScope.customer =$scope.loginData.CustomerID;
          $location.path("/Main");
         }

     },function (err) {
             $scope.message = err.error_description;
             alert($scope.message);
         });

    };

} ]);