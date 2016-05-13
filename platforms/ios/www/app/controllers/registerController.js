cameraApp.controller('registerController', ['$scope', 'authService', '$http', '$location', '$rootScope', function ($scope, authService, $http, $location, $rootScope) {


    $scope.message = "";

    $scope.scanQR = function () {
        alert("scan starting...");
        cordova.plugins.barcodeScanner.scan(
          function (result) {


              if (result.cancelled == false) {
                  try {
                      var barcode = result.text;
                      var code = barcode.split(";");
                      var brandcode = code[0];
                      var brandid = code[1];
                      var consultant = code[2];
                      var customer = code[3];
                      var imageuploadip = code[4];
                      var gigatronserviceip = code[5];
                      var aesloginip = code[6];

                      //alert(consultant + " " + customer + " " + server);
                      $rootScope.brandcode = brandcode;
                      $rootScope.brandid = brandid;
                      $rootScope.consultant = consultant;
                      $rootScope.customer = customer;
                      $rootScope.imageuploadip = imageuploadip;
                      $rootScope.gigatronserviceip = gigatronserviceip;
                      $rootScope.aesloginip = aesloginip;

                      writeToLocalFile();

                      $location.path("/Home");
                  }
                  catch (err) {
                      alert("Error getting barcode");
                  }
              }
          },
          function (error) {
              alert("Scanning failed: " + error);
          }
       );
    }

  

   writeToLocalFile = function () {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotWriteFileSystem, WriteFileSystemFail);
    }

    var gotWriteFileSystem = function (fileSystem) {

        var spath = fileSystem.root.toURL() + "/" + "register.txt"
        fileSystem.root.getFile("setting.txt", { create: false, exclusive: false }, gotWriteFileEntry, WriteFileEntryFail);
    }

    var WriteFileSystemFail = function (error) {
        console.log("Error File System");
    }

    var gotWriteFileEntry = function (fileEntry) {
        fileEntry.createWriter(writeFile, writeFail)
    }

    var WriteFileEntryFail = function (error) {
        console.log("Error File Entry");
    }

    var writeFile = function (writer) {
        writer.truncate(0)
        writer.write($scope.register);
    }

    var writeFail = function (error) {
        console.log("Error Write File");
    }


}]);