cameraApp.controller('loginController', ['$scope', 'authService', '$http', '$location', '$rootScope', function ($scope, authService, $http, $location, $rootScope) {



    $scope.loginData = {
        UserId: "NX1",
        Password: "123456"
    };

    $scope.message = "";

    $scope.register = {
        ConsulttantId: "NX1",
        Password:""
    }


    $scope.writeFile = function() {
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

    //------------------------------------------------------------------------------------------------------

    $scope.readFile = function () {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotReadFileSystem, ReadFileSystemFail);
    }

    var gotReadFileSystem = function (fileSystem) {

        var spath = fileSystem.root.toURL() + "/" + "register.txt"
        fileSystem.root.getFile("setting.txt", { create: false, exclusive: false }, gotReadFileEntry, ReadFileEntryFail);
    }

    var ReadFileSystemFail = function (error) {
        console.log("Error File System");
    }

    var gotReadFileEntry = function (fileEntry) {
        fileEntry.file(readFile, readFail);
    }

    var ReadFileEntryFail = function(error){
        console.log("Error File Entru");
    }

    var readFile = function (file) {
        reader = new FileReader();
        
        reader.onloadend = function(evt) {
            $scope.register = evt.target.result;
        }
        reader.readAsText(file);
    }

    //-----------------------------------------------------------------------------------------------

    $scope.login = function () {

        //alert("call web api");
        //alert($scope.loginData.UserId);
        authService.loginConsultant($scope.loginData).then(function (response) {

            if (response.data.isExist == true) {
                $location.path("/Client");
            }
            else {
                alert("Consultant: " + $scope.loginData.UserId + " Not Exists");
            }

        },
         function (err) {
             $scope.message = err.error_description;
             alert($scope.message);
         });

    };

}]);