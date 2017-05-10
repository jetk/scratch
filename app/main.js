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
            })
        .when("/inv", {
                templateUrl: "views/inv.htm",
                controller: "invCtrl"
            })
        .when("/profile", {
                templateUrl: "views/profile.htm",
                controller: "profileCtrl"
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
                case 3: $location.url("/inv");break;
                case 4: $location.url("/me");break;
                case 5: $location.url("/help");break;
            }
        });
        

    
    $scope.nav_items =    
    [
        {label:"Businesses", icon:"business", url:"/busi"},
        {label:"Research", icon:"subject", url:"/research"},
        {label:"Investment Management", icon:"work", url:"/inv"},
        {label:"My Profile", icon:"face", url:"/me"},
        {label:"Help", icon:"help", url:"/help"}    
    ]

}])


app.controller('alphaCtrl', ['$scope', '$mdSidenav', '$http', '$location', function ($scope, $mdSidenav, $http, $location) {

    
    $scope.foo = function() {
        $location.path('/profile').search({company: 'marduk'})
    }
    
    $scope.openLeftMenu = function() {
               $mdSidenav('left').toggle();
             };
     $scope.openRightMenu = function() {
       $mdSidenav('right').toggle();
     };

    
    $scope.articles = null
    $http.get('articles.json').success(function (data) {
            $scope.articles = data
        })
    

    $scope.all_filters=
    [
     {title:"Sectors",filters:[
                {title:"Adtech",ticked:false},
                {title:"Badtech",ticked:false},
                {title:"CADtech",ticked:false},
                {title:"Edtech",ticked:false},
                {title:"Fadtech",ticked:false}]},
    {title:"Geographies",filters:[
                {title:"Germany",ticked:false},
                {title:"France",ticked:false},
                {title:"Austria",ticked:false},
                {title:"Switzerland",ticked:false},
                {title:"Sweden",ticked:false},
                {title:"Spain",ticked:false}]},
     {title:"Series",filters:[
                {title:"Seed",ticked:false},
                {title:"A",ticked:false},
                {title:"B",ticked:false},
                {title:"C",ticked:false},
                {title:"Late",ticked:false}]}
    ]
    
}])



app.controller('invCtrl', ['$scope', '$mdDialog', '$http' , function ($scope, $mdDialog, $http) {

    $scope.hardy = function(list){        
        for (var i=0; i<list.length; i++){
            if (list[i].ticked == true){
                list.splice(i,1)
            }
        }
        if (list.length==1 && list[0].ticked){
            list.splice(0,1)
        }
        
        for (var i=0; i<list.length; i++){
            list.ticked = false
        }
    }
    
    $scope.delete_list = function(list){
        for (var i=0; i<$scope.company_lists.length; i++){
            if ($scope.company_lists[i].list_name==list.list_name){
                $scope.company_lists.splice(i,1)
            }
        }
    }
    
    
    var companies = null
    
    $http.get('companies.json').success(function (data) {
            
        companies=data
        }).error(function (data){
        console.log(data.message)
    })
    
    
    var affected_list =0 
    
    $scope.showDialog = function ($event, index) {
    affected_list = index
    console.log("affected list should be: "+affected_list)
    $mdDialog.show({
        targetEvent: $event,
        controller: function($scope) {
//          $scope.searchText = 'Enter a company';
          $scope.items = companies;
        },
        templateUrl: 'views/dialog.html',
        scope: $scope.$new()
    });
  };
  
    
    var aleph ={title:"FlatFrog Laboratories",description:"Developer and manufacturer of touch screens.",ticked:false}
    
    
    
    $scope.selectedItemChange = function(item){
        aleph.title = item.Company
        aleph.description = item.Description
    }
    

    $scope.cancel_company_add = function(){
    $mdDialog.hide();
    }
    
    $scope.confirm_company_add = function ()
    {
      var new_co = {}
      new_co.title = aleph.title
      new_co.description = aleph.description
      new_co.ticked = false
      $scope.company_lists[affected_list].companies.push(new_co)
      $mdDialog.hide();
    };
    
    $scope.company_lists = [{list_name:"Interesting Companies",companies:[{title:"FlatFrog Laboratories",description:"Developer and manufacturer of touch screens.",ticked:false},
{title:"Spartoo",description:"Operator of an online shopping outlet.",ticked:false},
{title:"Phone and Phone",description:"On-line vendor of mobile phones.",ticked:false}]},
                            {list_name:"Met or Spoken to",companies:[{title:"Terra Nova",description:"Electronic Waste Recycler.",ticked:false},
{title:"Oxford Nanopore Technologies",description:"Developer of molecular detection technology with applications in DNA sequencing.",ticked:false},
{title:"Metallkraft",description:"Recycler of silicon wafers from the semiconductor industry.",ticked:false}]},
                            {list_name:"Received Pitch",companies:[{title:"1855",description:"Euronext Listed e-tailer of wine.",ticked:false},
{title:"OpSec Security",description:"AIM-listed provider of authentication technologies",ticked:false},
{title:"Effpower",description:"Developer of bi-polar batteries for the automotive industry.",ticked:false}]}]
    

    
}])



app.controller('meCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {

    $scope.hardy = function(list){        
        for (var i=0; i<list.length; i++){
            if (list[i].ticked == true){
                list.splice(i,1)
            }
        }
        if (list.length==1 && list[0].ticked){
            list.splice(0,1)
        }
        
        for (var i=0; i<list.length; i++){
            list.ticked = false
        }
    }
    
    $scope.delete_list = function(list){
        for (var i=0; i<$scope.company_lists.length; i++){
            if ($scope.company_lists[i].list_name==list.list_name){
                $scope.company_lists.splice(i,1)
            }
        }
    }
    
    
    
    $scope.company_lists = [{list_name:"Interesting Companies",companies:[{title:"FlatFrog Laboratories",description:"Developer and manufacturer of touch screens.",ticked:false},
{title:"Spartoo",description:"Operator of an online shopping outlet.",ticked:false},
{title:"Phone and Phone",description:"On-line vendor of mobile phones.",ticked:false}]},
                            {list_name:"Met or Spoken to",companies:[{title:"Terra Nova",description:"Electronic Waste Recycler.",ticked:false},
{title:"Oxford Nanopore Technologies",description:"Developer of molecular detection technology with applications in DNA sequencing.",ticked:false},
{title:"Metallkraft",description:"Recycler of silicon wafers from the semiconductor industry.",ticked:false}]},
                            {list_name:"Received Pitch",companies:[{title:"1855",description:"Euronext Listed e-tailer of wine.",ticked:false},
{title:"OpSec Security",description:"AIM-listed provider of authentication technologies",ticked:false},
{title:"Effpower",description:"Developer of bi-polar batteries for the automotive industry.",ticked:false}]}]
    

    
}])


app.controller('busiCtrl', ['$scope', '$mdDialog', '$http', function ($scope, $mdDialog, $http) {

    $scope.countries = null
    
     $http.get('countries.json').success(function (data) {
            
        $scope.countries=data
        }).error(function (data){
        console.log(data.message)
    })
    
    
     
    $scope.f=[{"GBR":false},{"FRA":false},{"DNK":false}]
     
    $scope.companies = null
    
    
    
    
        $scope.openLeftMenu = function() {
               $mdSidenav('left').toggle();
             };
    
    $http.get('companies.json').success(function (data) {
            
        $scope.companies=data
        }).error(function (data){
        console.log(data.message)
    })
    

}])

app.controller('researchCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {

    
    $scope.channel_lists = 
        
        [
            {channel:"Microsoft Ventures's Hot Picks",img:"img/msftven_logo.png"},
            {channel:"Fintech in Spain by Group Olivo",img:"img/olivo_logo.png"},
            {channel:"Deeptech by Cisco",img:"img/cisco_logo.png"},
            {channel:"Insurtech by Aviva",img:"img/aviva_logo.png"},
            {channel:"Early Stage by 500startups",img:"img/500startups_logo.png"},
            {channel:"Terraforming Technology by Weyland Yutani",img:"img/WYC_logo.png"}
        ]


}])

app.controller('helpCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {



}])


app.controller('profileCtrl', ['$scope', '$mdSidenav', '$http', '$location', function ($scope, $mdSidenav, $http, $location) {

    $scope.pro = {}    
    
    var company = $location.search().company+".json"
    
        $http.get(company).success(function (data) {
            $scope.pro = data
        })

}])



;