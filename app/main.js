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
        .when("/me", {
            templateUrl: "views/me.htm",
            controller: "meCtrl"
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
                case 1: $location.url("/busi");break;
                case 2: $location.url("/research");break;
                case 3: $location.url("/me");break;
                case 4: $location.url("/help");break;
            }
        });
        

}])


app.controller('alphaCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {



}])




app.controller('meCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {

    $scope.hardy = function(){
        for (var i=0; i<$scope.targets.length; i++){
            if ($scope.targets[i].ticked == true){
                $scope.targets.splice(i,1)
            }
        }
        for (var i=0; i<$scope.targets.length; i++){
            $scope.targets[i].ticked = false
        }
    }
    
    
    $scope.targets =[{title:"FlatFrog Laboratories",description:"Developer and manufacturer of touch screens.",ticked:false},
{title:"Spartoo",description:"Operator of an online shopping outlet.",ticked:false},
{title:"Phone and Phone",description:"On-line vendor of mobile phones.",ticked:false},
{title:"Terra Nova",description:"Electronic Waste Recycler.",ticked:false},
{title:"Oxford Nanopore Technologies",description:"Developer of molecular detection technology with applications in DNA sequencing.",ticked:false},
{title:"Metallkraft",description:"Recycler of silicon wafers from the semiconductor industry.",ticked:false},
{title:"1855",description:"Euronext Listed e-tailer of wine.",ticked:false},
{title:"OpSec Security",description:"AIM-listed provider of authentication technologies",ticked:false},
{title:"Effpower",description:"Developer of bi-polar batteries for the automotive industry.",ticked:false}]

}])


app.controller('busiCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {



}])

app.controller('researchCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {



}])

app.controller('helpCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {



}])

;