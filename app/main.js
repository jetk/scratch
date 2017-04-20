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
            templateUrl: "prime.htm"
        })
        .when("/alpha", {
            templateUrl: "alpha.htm",
            controller: "alphaCtrl"
        })
        .when("/beta", {
            templateUrl: "beta.htm",
            controller: "betaCtrl"
        });
});

app.controller('AppCtrl', ['$scope', '$mdDialog', '$http', function ($scope, $mdDialog, $http) {


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

    $scope.foo = "hello"
    $scope.bar = function () {




        $mdDialog.show(
            $mdDialog.alert()
            .title('Success!')
            .content('Hello World')
            .ok('Ok')
        );


        if ($scope.foo == "hello") {

            $scope.foo = "world"
        } else {

            $scope.foo = "hello"
        }


    }
}])


app.controller('alphaCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {



}])




app.controller('betaCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {


}]);