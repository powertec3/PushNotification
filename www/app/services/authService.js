'use strict';
pushApp.factory('authService', ['$http', '$q', 'ngAuthSettings', function ($http, $q, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
   
    var authServiceFactory = {};

   
    var _loginConsultant = function (loginData) {

        //alert("http.post");
        var deferred = $q.defer();
      
        $http.post(serviceBase + 'api/Login', loginData).then(function (response) {
       
            //alert(response);
            deferred.resolve(response);

        }),(function (err, status) {
         
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _loginCustomer = function (loginData) {

        //alert("http.post");
        var deferred = $q.defer();

        

        $http.post(serviceBase + 'api/NYSS/Customer/fnGetCustomerDetails', loginData).success(function (response) {
            if (response) {
                deferred.resolve(response);
            } else {
                deferred.reject(response);
            }
        }).catch(function (data, status) {
           

            deferred.reject(error);
        });

        return deferred.promise;


    };

    var _register = function (parameters) {
        return _httpPost(serviceBase, parameters);
    }

    var _getRegisterByName = function (parameters)
    {
        return _httpGet(serviceBase, parameters);
    }

    var _httpGet = function (serviceBase, parameters) {
        var deferred = $q.defer();

      

        $http({
            url: serviceBase,
            method: "GET",
            params: parameters
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
            //console.log(err);
            //alert(err);
        });
        return deferred.promise;
    }

    var _httpPost = function (serviceBase, parameters) {
         var deferred = $q.defer();

         //if (serviceURL.indexOf('oauth2/') == 0)
         //    serviceURL = serviceURL.replace("oauth2/", zSrv_OAuth2.OAuth2.BaseUri);

        $http.post(serviceBase, parameters).success(function (response) {
             deferred.resolve(response);
         }).error(function (err, status) {
             deferred.reject(err);
             //console.log(err);
             //alert(err);
         });
         return deferred.promise;
     }

    var _httpPut = function (serviceBase, parameters) {
         var deferred = $q.defer();

         //if (serviceURL.indexOf('oauth2/') == 0)
         //    serviceURL = serviceURL.replace("oauth2/", zSrv_OAuth2.OAuth2.BaseUri);

        $http.put(serviceBase, parameters).success(function (response) {
             deferred.resolve(response);
         }).error(function (err, status) {
             deferred.reject(err);
             //console.log(err);
             //alert(err);
         });
         return deferred.promise;
     }

     authServiceFactory.loginCustomer = _loginCustomer;
     authServiceFactory.loginConsultant = _loginConsultant;
     authServiceFactory.httpGet = _httpGet;
     authServiceFactory.httpPost = _httpPost;
     authServiceFactory.httpPut = _httpPut;
     authServiceFactory.register = _register;
     authServiceFactory.getRegisterByName = _getRegisterByName

    return authServiceFactory;
}]);