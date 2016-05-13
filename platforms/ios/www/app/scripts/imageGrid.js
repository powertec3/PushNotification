
cameraApp.directive("imageGrid", ['$compile', '$q', '$location','$rootScope',
function ($compile, $q, $location,$rootScope) {
    return {


        link: function (scope, element, attrs) {

            var generateGrid = function () {

                var session = attrs.session;

                scope.photos = [];
                getSessionPhotos(session);

                var imageElem = angular.element("<img width='100%' height='200px'>");
                imageElem.attr('Id', 'img');

                var divElem = angular.element("<div class='row-fluid'>");
                var divElemRes = angular.element("<div class='col-lg-12 col-md-10 '>");
                var divContainer = angular.element("<div class='cover-container'>");
                
                for (photo in scope.photos) {
                    var divItem = angular.element("<div class='cover-item' style='background-image: url(" + scope.photos[photo] + ")'>");
                    divItem.attr('Id', photo);
                    divItem.attr('ng-click', 'showPicture($event)');
                    divContainer.append(divItem);
                }

                divElemRes.append(divContainer);
                divElem.append(divElemRes);


                element.append(imageElem);
                element.append(divElem);
                
                $compile(element.contents())(scope);

            }

            var getSessionPhotos = function (session) {

                var photos = $rootScope.client[0].photos;
                for(photo in photos)
                {
                    if (photos[photo].session == session) {
                        scope.photos.push(photos[photo].square_picture);
                    }

                }
            }

            scope.showPicture = function (event) {
                var cellId = event.currentTarget.id;
                var ele = "#img";
                var currentElement = angular.element(ele);
                currentElement.attr('src', scope.photos[cellId]);
            }

            generateGrid();



        },
        restrict: "E",
        replace: true
    }
}])

