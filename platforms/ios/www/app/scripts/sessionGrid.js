
cameraApp.directive("sessionGrid", ['$compile', '$q', '$location','authService','$rootScope',
function ($compile, $q, $location, authService, $rootScope) {
    return {


        link: function (scope, element, attrs) {

            var generateGrid = function () {

                authService.httpGet($rootScope.gigatronserviceip, { "client_name": $rootScope.customer }).then(function (clientJSON) {
                    $rootScope.client = clientJSON;
                    scope.clientDetails = clientJSON;

                    scope.sessionCount = scope.clientDetails[0].sessions.length;

                    //alert("session:" + scope.sessionCount);

                scope.sessionCount = attrs.sessions;
                scope.cols = attrs.cols;
                scope.rows = Math.floor(scope.sessionCount / scope.cols);


                var divScroll = angular.element("<div class ='divscroll'>");
                    
                var tableElem = angular.element("<table width='100%'>");
                tableElem.attr('border', '1'); 
                   
                var session = scope.sessionCount;
                //alert("session:" + session);


                for (var row = scope.rows; row > 0; row--) {
                    //alert("row:" + row);
                    var rowElem = angular.element("<tr>");
                    for (var col = scope.cols; col > 0; col--) {
                        //alert("col:" + col);
                        var cell = angular.element("<td width='25%'>").attr("Id", row + "-" + col);
                        var id = session--;
                        var button = angular.element("<button>").attr("Id", id).text(id);
                        //button.attr('width', '20%');
                        //button.attr('height', '10%');

                        button.attr('ng-click', 'showSession($event)');
                        cell.append(button);
                       rowElem.append(cell);
                    }

                        tableElem.append(rowElem);
                    }
                
                var rcols = scope.sessionCount % scope.cols;
                if (rcols > 0)
                {
                    var rowElem = angular.element("<tr>");

                    for (var col = rcols; col > 0; col--) {
                       
                        var cell = angular.element("<td>").attr("Id", row + "-" + col);
                        var id = session--;
                        var button = angular.element("<button>").attr("Id", id).text( id);
                        button.attr('ng-click', 'showSession($event)');
                        cell.append(button);
                        rowElem.append(cell);
                    }
                    tableElem.append(rowElem);
                }
                   

                divScroll.append(tableElem);
                element.append(divScroll);
                
                $compile(element.contents())(scope);

                });

        }

            scope.showSession = function (event) {
                var cellId = event.currentTarget.id;
                //alert("Session" + cellId);
                $location.path("/Browse/" + cellId);
            }

            generateGrid();



        },
        restrict: "E",
        replace: true
    }
}])

