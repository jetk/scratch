var app = angular.module('StarterApp', ['ngMaterial', 'ngRoute', 'app.services', 'app.controllers']);


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
        })
        .when("/inv", {
            templateUrl: "views/inv.htm",
            controller: "invCtrl"
        })
        .when("/profile", {
            templateUrl: "views/profile.htm",
            controller: "profileCtrl"
        })
        .when("/article", {
            templateUrl: "views/article.htm",
            controller: "articleCtrl"
        });
});
;