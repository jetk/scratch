var app = angular.module('StarterApp', ['ngMaterial', 'ngRoute']);


app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('red')
        .accentPalette('grey')
        .warnPalette('amber');
});

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/prime.htm"
        })
        .when("/alpha", {
            templateUrl: "views/alpha.htm",
            controller: "alphaCtrl"
        })
        .when("/people", {
            templateUrl: "views/people.htm",
            controller: "peopleCtrl"
        })
        .when("/busi", {
                templateUrl: "views/busi.htm",
                controller: "busiCtrl"
            })
        .when("/research", {
                templateUrl: "views/research.htm",
                controller: "researchCtrl"
            })
        .when("/help", {
                templateUrl: "views/help.htm",
                controller: "helpCtrl"
            });
});

app.controller('AppCtrl', ['$scope', '$mdDialog', '$http', '$location', function ($scope, $mdDialog, $http, $location) {


    this.querySearch = function (query) {
        return $http.get("https://api.github.com/search/users", {
                params: {
                    q: query
                }
            })
            .then(function (response) {
                return response.data.items;
            })
    }

            $scope.selectedIndex = null;

        $scope.$watch('selectedIndex', function(current, old) {
            switch (current) {
                case 0: $location.url("/alpha");break;
                case 1: $location.url("/people");break;
                case 2: $location.url("/busi");break;
                case 3: $location.url("/research");break;
                case 4: $location.url("/help");break;
            }
        });
        

}])


app.controller('alphaCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {



}])




app.controller('peopleCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {


}])


app.controller('busiCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {



}])

app.controller('researchCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {



}])

app.controller('helpCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {



}])

;