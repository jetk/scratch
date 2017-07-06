var app = angular.module('StarterApp', ['ngMaterial', 'ngRoute', 'app.services', 'app.controllers', 'rzModule', 'angularTrix']);


app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('red')
        .accentPalette('grey')
        .warnPalette('amber');
    
      $mdThemingProvider.theme('alt')
        .primaryPalette('deep-orange')
        .accentPalette('red')
        .warnPalette('grey').dark();
    
});




app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/feed.htm",
            controller:"feedCtrl"
        })
    .when("/feed", {
            templateUrl: "views/feed.htm",
            controller: "feedCtrl"
        })
        .when("/alpha", {
            templateUrl: "views/alpha.htm",
            controller: "alphaCtrl"
        })
        .when("/me", {
            templateUrl: "views/me.htm",
            controller: "meCtrl"
        })
        .when("/cohorts", {
            templateUrl: "views/cohorts.htm",
            controller: "cohortsCtrl"
        })
        .when("/companies", {
            templateUrl: "views/companies.htm",
            controller: "companiesCtrl"
        })
        .when("/busi", {
            templateUrl: "views/busi.htm",
            controller: "busiCtrl"
        })
        .when("/research", {
            templateUrl: "views/research.htm",
            controller: "researchCtrl"
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
        })
        .when("/deals", {
            templateUrl: "views/deals.htm",
            controller: "dealsCtrl"
        })
        .when("/newdeal", {
            templateUrl: "views/newdeal.htm",
            controller: "newdealCtrl"
        })
        .when("/newdr", {
            templateUrl: "views/newdr.htm",
            controller: "newdrCtrl"
        })
        .when("/selectinvestors", {
            templateUrl: "views/selectinvestors.htm",
            controller: "selectinvestorsCtrl"
        })
        .when("/pipeline", {
            templateUrl: "views/pipeline.htm",
            controller: "pipelineCtrl"
        })
        .when("/dealportal", {
            templateUrl: "views/dealportal.htm",
            controller: "dealportalCtrl"
        })
            .when("/investors", {
            templateUrl: "views/investors.htm",
            controller: "investorsCtrl"
        })
     .when("/myinvestors", {
            templateUrl: "views/myinvestors.htm",
            controller: "myinvestorsCtrl"
        })
    .when("/allinvestors", {
            templateUrl: "views/allinvestors.htm",
            controller: "all    investorsCtrl"
        });
});;