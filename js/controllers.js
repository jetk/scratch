angular.module('app.controllers', [])

  

    .controller('AppCtrl', ['$scope', '$mdDialog', '$http', '$location', 'co_service', function ($scope, $mdDialog, $http, $location, co_service) {

        $scope.go_to_profile = function (company) {

            $location.path('/profile').search({
                company: company.Company
            })

        }
        $scope.items = co_service
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

        $scope.$watch('selectedIndex', function (current, old) {
            switch (current) {
                case 0:
                    $location.url("/alpha");
                    break;
                case 1:
                    $location.url("/busi");
                    break;
                case 2:
                    $location.url("/research");
                    break;
                case 3:
                    $location.url("/inv");
                    break;
                case 4:
                    $location.url("/me");
                    break;
                case 5:
                    $location.url("/deals");
                    break;
            }
        });



        $scope.nav_items = [
            {
                label: "Businesses",
                icon: "business",
                url: "/busi"
        },
            {
                label: "Channels",
                icon: "subject",
                url: "/research"
        },
            {
                label: "My Co's",
                icon: "work",
                url: "/inv"
        },
            {
                label: "Deals",
                icon: "developer_board",
                url: "/deals"
        },
            {
                label: "Profile",
                icon: "face",
                url: "/me"
        }
    ]

}])

    .controller('alphaCtrl', ['$scope', '$mdSidenav', '$http', '$location', '$timeout', 'feed_generator', function ($scope, $mdSidenav, $http, $location, $timeout, feed_generator) {
        
        
        $scope.minimum_raised=10
        $scope.go_to_profile = function (article) {
             
             
            $location.path('/profile').search({
                company: article.company
            })
             
            
        }
        
        
        /*
        Navigation
        */
        $scope.go_to_inv = function () {
            $location.path('/inv')
        }

        $scope.go_to_article = function (article) {

            $location.path('/article').search({
                company: article.company,
                type: article.subject
            })

        }

        /*
        Populates right side-bar with followed companies
        */
        $scope.company_lists = null;
        $http.get('my_companies.json').success(function (data) {
            $scope.company_lists = data
        })

        
        /*
        Display functions for main feed
        */
        $scope.get_article_list = function (mode) {

            if ($scope.fullfeed == null) {
                return null;
            }
            switch (mode) {
                case 0:
                    return $scope.fullfeed.followed;
                    break;
                case 1:
                    return $scope.fullfeed.recommended;
                    break;
                case 2:
                    //$scope.filter = getSectors($scope.fullfeed.all);
                    return $scope.fullfeed.all;
                    break;
                default:
                    return $scope.fullfeed.followed;
                    break;
            }
        };

        $scope.get_mode_name = function (mode) {

            switch (mode) {
                case 0:
                    return "followed";
                    break;
                case 1:
                    return "recommended";
                    break;
                case 2:
                    return "all";
                    break;
                default:
                    return $scope.fullfeed.followed;
                    break;
            }
        };

        /*
        Controls the sidenav
        */
        $scope.openLeftMenu = function () {
            $mdSidenav('left').toggle();
        };
        $scope.openRightMenu = function () {
            $mdSidenav('right').toggle();
        };


        function replace(dataset) {
            var entry
            //Throwing an error because one of the
            if ($scope.company_lists != null) {

                for (entry of dataset.followed) {
                    entry.company = $scope.company_lists[getRandomInt(0, $scope.company_lists.length-1)].companies[getRandomInt(0, 2)].title
                }
            }
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        
        
        /*
        Filtering
        */
       
       //Kludge to force articles to show before a filter is engaged
        $scope.touched=false;
        
        //extracts possible filters from the feed depending on content
        $scope.getGenericFilters=function(list, property) {
            
            return (list || []).
            map(function (article) {
                
              return article[property];
            }).
            filter(function (cat, idx, arr) {
              return arr.indexOf(cat) === idx;
            });
        }
        
        //Replicated a few times to get filtering on the respective categories
        $scope.filterBySector = function(article) {
            if(true||$scope.touched){
            return $scope.filter[article.sector] || noFilter($scope.filter);
            }
            else return true;
        }
        
        $scope.filterByGeography = function(article) {
            if($scope.touched){
            return $scope.geog[article.geography] || noFilter($scope.geog);
            }
            else return true;
        }
        
        $scope.filterBySubject = function(article) {
            if($scope.touched){
            return $scope.subj[article.subject] || noFilter($scope.subj);
            }
            else return true;
        }

        //used for returning everything when no filter is assigned
        function noFilter(filterObj) {
            return Object.
            keys(filterObj).
            every(function (key) {
              return !filterObj[key];
            });
        }
        $scope.noFilter = noFilter

        
        //TODO: rename so it's no longer a logging function
        $scope.log = function () {
            console.log($scope.filter)
            $scope.touched=true
        }

        $scope.loggeo = function(){
            console.log($scope.geog)
            $scope.touched=true
        }
        
        $scope.logsub = function(){
            console.log($scope.subj)
            $scope.touched=true
        }
        
        //Still can't figure out how to work this, currently just replicating the function two times. Might one day be more useful
       $scope.filterByProperties = function(wine) {

            var activeFilterProps = Object.
            keys($scope.filter).filter(function (prop) {
                return !noFilter($scope.filter[prop]);
            });

            return activeFilterProps.every(function (prop) {
                return $scope.filter[prop][wine[prop]];
            });

        }
        
        

        $scope.fullfeed = null
        $scope.list_loaded = false
        $scope.filter={}
        $scope.geog = {}
        $scope.subj= {}
        $scope.mode = 0
        
   
        
        
        function set_up_sector_filters(temp_filters){
            
            
            if (angular.isString(temp_filters)){
                
                $scope.filter[temp_filters]=!$scope.filter[temp_filters];
            }
            
            for(i = 0; i<temp_filters.length;i++){
                $scope.filter[temp_filters[i]]=$location.search()?false:true;
            }
                        
            for(var key in $location.search())
                    $scope.filter[key]=true
            
        }
        
        $scope.set_up_sector_filters = set_up_sector_filters
        
        
                
        function set_up_geog_filters(temp_geog){
            //I know this is playing with fire to have this function handle
            //both strings and arrays but hey it's JS and I'm being really lazy
            if (angular.isString(temp_geog)){
                console.log("doing the thing")
                $scope.geog[temp_geog]=!$scope.geog[temp_geog];
            }
            
            for(i = 0; i<temp_geog.length;i++){
                $scope.geog[temp_geog[i]]=$location.search()?false:true;
            }
                        
            for(var key in $location.search())
                    $scope.geog[key]=true
            
        }
        $scope.set_up_geog_filters = set_up_geog_filters
        
        
                
        function set_up_subject_filters(temp_subject){
            //I know this is playing with fire to have this function handle
            //both strings and arrays but hey it's JS and I'm being really lazy
            if (angular.isString(temp_subject)){
                console.log("doing the thing")
                $scope.subj[temp_subject]=!$scope.subj[temp_subject];
            }
            
            for(i = 0; i<temp_subject.length;i++){
                $scope.subj[temp_subject[i]]=$location.search()?false:true;
            }
                        
            for(var key in $location.search())
                    $scope.subj[key]=true
            
        }
        $scope.set_up_subject_filters = set_up_subject_filters
        
        
        
        
        
        
        
        
        $http.get('feed.json').success(function (data) {
            $scope.fullfeed = data
            
            
            var temp_filters=$scope.getGenericFilters(data.followed,"sector")
            set_up_sector_filters(temp_filters)
            
            
            var temp_geog=$scope.getGenericFilters(data.followed,"geography")
            set_up_geog_filters(temp_geog)
            
            var temp_subject=$scope.getGenericFilters(data.followed,"subject")
            set_up_geog_filters(temp_subject)
            
            $scope.fullfeed.all = feed_generator.generate_feed(0,20)
            $scope.list_loaded = true
            replace($scope.fullfeed)
        })



}])




    .controller('invCtrl', ['$scope', '$mdDialog', '$http', 'co_service', '$location', function ($scope, $mdDialog, $http, co_service, $location) {

        $scope.hardy = function (list) {
            
            if (list.length == 1 && list[0].ticked) {
                list.splice(0, 1)
                return
            }
            
            for (var i = 0; i < list.length; i++) {
                if (list[i].ticked == true) {
                    list.splice(i, 1)
                }
            }


            for (var i = 0; i < list.length; i++) {
                list.ticked = false
            }
        }

        $scope.delete_list = function (list) {
            for (var i = 0; i < $scope.company_lists.length; i++) {
                if ($scope.company_lists[i].list_name == list.list_name) {
                    $scope.company_lists.splice(i, 1)
                }
            }
        }


        $scope.company_lists = null;
        
        $http.get('my_companies.json').success(function (data) {
            $scope.company_lists = data
        })

            
        $scope.go_to_profile = function (company){
            
        $location.path('/profile').search({
                company: angular.isString(company)?company:company.Company
            })
        }
        
        var affected_list = 0

        $scope.showDialog = function ($event, index) {
            affected_list = index
            console.log("affected list should be: " + affected_list)

            $mdDialog.show({
                targetEvent: $event,
                controller: function ($scope) {
                    //          $scope.searchText = 'Enter a company';
                    $scope.items = co_service;
                },
                templateUrl: 'views/dialog.html',
                scope: $scope.$new()
            });
        };


        var aleph = {
            title: "Example co",
            description: "Lorem ipsum dolor shit amit.",
            ticked: false
        }



        $scope.selectedItemChange = function (item) {
            aleph.title = item.Company
            aleph.description = item.Description
        }


        $scope.cancel_company_add = function () {
            $mdDialog.hide();
        }

        $scope.confirm_company_add = function () {
            var new_co = {}
            new_co.title = aleph.title
            new_co.description = aleph.description
            new_co.ticked = false
            new_co.noti = 0
            new_co.lin = 0
            $scope.company_lists[affected_list].companies.push(new_co)
            $mdDialog.hide();
        };

        $scope.notifications_dialog = function ($event, number, company) {

            
            
            $mdDialog.show({
                targetEvent: $event,
                locals: {
                    number: number,
                    company: company
                },
                controller: function ($scope, number, company) {
                    $scope.number = number;
                    $scope.company = company;
                    $scope.range = function (count) {
                        var notifs = [];

                        for (var i = 0; i < count; i++) {
                            notifs.push(i)
                        }

                        return notifs;
                    }
                },

                templateUrl: 'views/noti.htm',
                scope: $scope.$new()
            });
        };

        $scope.hide_notifications = function () {
            $mdDialog.hide();
        }



        $scope.linkedin_dialog = function ($event, number, company) {

            $mdDialog.show({
                targetEvent: $event,
                locals: {
                    number: number,
                    company: company
                },
                controller: function ($scope, number, company) {
                    $scope.number = number;
                    $scope.company = company;
                    $scope.range = function (count) {
                        var linkedin = [];

                        for (var i = 0; i < count; i++) {
                            linkedin.push(i)
                        }

                        return linkedin;
                    }
                },

                templateUrl: 'views/lin.htm',
                scope: $scope.$new()
            });
        };

        $scope.hide_linkedin = function () {
            $mdDialog.hide();
        }






}])

    .controller('meCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {

 

        
        /*
        
        Ripped directly out of MD-Chips demo. Need to replace with actual filters
        */
    $scope.readonly = false;
    $scope.selectedItem = null;
    $scope.searchText = null;
    $scope.querySearch = querySearch;
    //TODO
    $scope.filters = loadVegetables();
    $scope.selectedFilters = [];
    $scope.numberChips = [];
    $scope.numberChips2 = [];
    $scope.numberBuffer = '';
    $scope.RequireMatch = true;
    $scope.transformChip = transformChip;

    /**
     * Return the proper object when the append is called.
     */
    function transformChip(chip) {
      // If it is an object, it's already a known chip
      if (angular.isObject(chip)) {
        return chip;
      }

      // Otherwise, create a new one
      return { name: chip, type: 'new' }
    }

    /**
     * Search for vegetables.
     */
    function querySearch (query) {
      var results = query ? $scope.filters.filter(createFilterFor(query)) : [];
      return results;
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(filter) {
        return (filter._lowername.indexOf(lowercaseQuery) === 0) ||
            (filter._lowertype.indexOf(lowercaseQuery) === 0);
      };

    }

    $scope.push_to_selected = function(chip){
        console.log(JSON.stringify(chip))
        $scope.selectedFilters.push(chip)
    }
    function loadVegetables() {
      var filters = [
{'name':"Macedonia",'type':"Geo"},
{'name':"Adtech",'type':"Sector"},
{'name':"Albania",'type':"Geo"},
{'name':"Alternative Telecom Operators",'type':"Sector"},
{'name':"Andorra",'type':"Geo"},
{'name':"Application-Specific Hardware",'type':"Sector"},
{'name':"Austria",'type':"Geo"},
{'name':"Azerbaijan",'type':"Geo"},
{'name':"Belarus",'type':"Geo"},
{'name':"Belgium",'type':"Geo"},
{'name':"Bosnia and Herzegovina",'type':"Geo"},
{'name':"Bulgaria",'type':"Geo"},
{'name':"Cleantech",'type':"Sector"},
{'name':"Communications & Networking",'type':"Sector"},
{'name':"Consulting",'type':"Sector"},
{'name':"Content Delivery Networks",'type':"Sector"},
{'name':"Croatia",'type':"Geo"},
{'name':"Czech Republic",'type':"Geo"},
{'name':"Data Centres",'type':"Sector"},
{'name':"Denmark",'type':"Geo"},
{'name':"Devices",'type':"Sector"},
{'name':"Diagnostics",'type':"Sector"},
{'name':"Discovery Platforms",'type':"Sector"},
{'name':"Distribution",'type':"Sector"},
{'name':"Drug Delivery Systems",'type':"Sector"},
{'name':"Drug Discovery",'type':"Sector"},
{'name':"Electronics Manufacturing Services",'type':"Sector"},
{'name':"Enterprise Application Software",'type':"Sector"},
{'name':"Estonia",'type':"Geo"},
{'name':"Finland",'type':"Geo"},
{'name':"France",'type':"Geo"},
{'name':"Genomics",'type':"Sector"},
{'name':"Germany",'type':"Geo"},
{'name':"Greece",'type':"Geo"},
{'name':"Hardware",'type':"Sector"},
{'name':"Healthcare",'type':"Sector"},
{'name':"Healthcare IT",'type':"Sector"},
{'name':"Hosting",'type':"Sector"},
{'name':"Hungary",'type':"Geo"},
{'name':"IaaS",'type':"Sector"},
{'name':"Iceland",'type':"Geo"},
{'name':"Imaging",'type':"Sector"},
{'name':"Ireland",'type':"Geo"},
{'name':"IT",'type':"Sector"},
{'name':"Italy",'type':"Geo"},
{'name':"Kosovo",'type':"Geo"},
{'name':"Late",'type':"Stage"},
{'name':"Latvia",'type':"Geo"},
{'name':"Liechtenstein",'type':"Geo"},
{'name':"Lithuania",'type':"Geo"},
{'name':"Luxembourg",'type':"Geo"},
{'name':"Malta",'type':"Geo"},
{'name':"Media & Internet",'type':"Sector"},
{'name':"Medtech",'type':"Sector"},
{'name':"M-Health",'type':"Sector"},
{'name':"Moldova",'type':"Geo"},
{'name':"Monaco",'type':"Geo"},
{'name':"Montenegro",'type':"Geo"},
{'name':"Netherlands",'type':"Geo"},
{'name':"Norway",'type':"Geo"},
{'name':"Other",'type':"Sector"},
{'name':"Other Healthcare",'type':"Sector"},
{'name':"Other System Software",'type':"Sector"},
{'name':"Other Vertical Application Software",'type':"Sector"},
{'name':"Poland",'type':"Geo"},
{'name':"Portugal",'type':"Geo"},
{'name':"Processing",'type':"Sector"},
{'name':"Romania",'type':"Geo"},
{'name':"Russia",'type':"Geo"},
{'name':"San Marino",'type':"Geo"},
{'name':"Security Software",'type':"Sector"},
{'name':"Seed",'type':"Stage"},
{'name':"Semis",'type':"Sector"},
{'name':"Serbia",'type':"Geo"},
{'name':"Series A",'type':"Stage"},
{'name':"Series B",'type':"Stage"},
{'name':"Series C",'type':"Stage"},
{'name':"Services",'type':"Sector"},
{'name':"Slovakia",'type':"Geo"},
{'name':"Slovenia",'type':"Geo"},
{'name':"Software",'type':"Sector"},
{'name':"Spain",'type':"Geo"},
{'name':"Sweden",'type':"Geo"},
{'name':"Switzerland",'type':"Geo"},
{'name':"Telecom",'type':"Sector"},
{'name':"Telecom Services",'type':"Sector"},
{'name':"Telecom Software",'type':"Sector"},
{'name':"Traditional Telecom Operators",'type':"Sector"},
{'name':"Turkey",'type':"Geo"},
{'name':"Ukraine",'type':"Geo"},
{'name':"United Kingdom",'type':"Geo"},
{'name':"Vatican City",'type':"Geo"}
]

      return filters.map(function (filter) {
        filter._lowername = filter.name.toLowerCase();
        filter._lowertype = filter.type.toLowerCase();
        return filter;
      });
    }
  



}])


    .controller('busiCtrl', ['$scope', '$mdDialog', '$http', 'co_service', function ($scope, $mdDialog, $http, co_service) {
        
        $scope.companies = co_service
        
       //Kludge to force articles to show before a filter is engaged
        $scope.touched=false;
        
        //extracts possible filters from the feed depending on content
        $scope.getGenericFilters=function(list, property) {
            
            return (list || []).
            map(function (article) {
                
              return article[property];
            }).
            filter(function (cat, idx, arr) {
              return arr.indexOf(cat) === idx;
            });
        }
        
        //Replicated a few times to get filtering on the respective categories
        $scope.filterBySector = function(article) {
            return $scope.filter[article.subsector] || noFilter($scope.filter);
        }
        
        $scope.filterByGeography = function(article) {
            return $scope.geog[article.IsoCountry1] || noFilter($scope.geog);
        }
        


        //used for returning everything when no filter is assigned
        function noFilter(filterObj) {
            return Object.
            keys(filterObj).
            every(function (key) {
              return !filterObj[key];
            });
        }
        $scope.noFilter = noFilter

        
        //TODO: rename so it's no longer a logging function
        $scope.log = function () {
            console.log($scope.filter)
            $scope.touched=true
        }

        $scope.loggeo = function(){
            console.log($scope.geog)
            $scope.touched=true
        }
        
   
        //Still can't figure out how to work this, currently just replicating the function two times. Might one day be more useful
       $scope.filterByProperties = function(wine) {

            var activeFilterProps = Object.
            keys($scope.filter).filter(function (prop) {
                return !noFilter($scope.filter[prop]);
            });

            return activeFilterProps.every(function (prop) {
                return $scope.filter[prop][wine[prop]];
            });

        }
        
        

        $scope.fullfeed = null
        $scope.list_loaded = false
        $scope.filter={}
        $scope.geog = {}
        $scope.subj= {}
        $scope.mode = 0
            
            $scope.list_loaded = true
        
        
        
        
        
        
        
        
        
        $scope.countries = co_service

        /*
        $http.get('countries.json').success(function (data) {

            $scope.countries = data
        }).error(function (data) {
            console.log(data.message)
        })
        */



        $scope.f = [{
            "GBR": false
    }, {
            "FRA": false
    }, {
            "DNK": false
    }]

        




        $scope.openLeftMenu = function () {
            $mdSidenav('left').toggle();
        };


}])

    .controller('researchCtrl', ['$scope', '$mdDialog','$location', function ($scope, $mdDialog, $location) {
        
        
        $scope.save = function(channel, index){
            
            
            
            console.log("parent index is: "+JSON.stringify(channel))
            console.log("child index is: "+index)
            
            $scope.channel_lists.saved.push($scope.channel_lists[channel][index])
            $scope.channel_lists[channel].splice(index,1)
        }
        
        $scope.go_to_alpha_with_filters=function(filters){
            var search_params = {}
            for (i=0;i< filters.length;i++){
                search_params[filters[i]]=true
            }
            console.log(JSON.stringify(search_params))
            $location.path('/alpha').search(search_params)
        }
        
        
        $scope.alpha_with_parameters =function(index){
            if(index==0){
                
             $location.path('/alpha').search({
                 Adtech: true,
                 Austria: true,
                 Germany: true,
                 Switzerland: true
            })
            }
            else if (index==1){
                $location.path('/alpha').search({
                 Spain: true,
                 Fintech: true
            })
            }
            
        }

        
        
        
        $scope.channel_lists=
            {SAVED:[
                {
                    name: "Swiss Adtech",
                    comments: "",
                    filters: ["Adtech","Switzerland"],
                    contributors: ["G4V","Catcap"]
            },
                {
                    name: "Austrain Edtech",
                    comments: "",
                    filters: ["Austria","Edtech"],
                    contributors: ["G4V"]
            },
         
                
        ],
           RECOMMENDED: [
                {
                    name: "Adtech in DACH",
                    comments: "",
                    filters: ["Adtech","Germany","Switzerland","Austria"],
                    contributors: ["G4V","Catcap"]
            },
                {
                    name: "Fintech in Spain by Group Olivo",
                    comments: "",
                    filters: ["Fintech","Spain"],
                    contributors: ["G4V","Olivo"]
            },
            {
                    name: "Deeptech",
                    comments: "",
                    filters: ["Deeptech"],
                    contributors: ["G4V","Olivo"]
            },
                
        ],
             
             POPULAR: [
                {
                    name: "Michael Kotting's Hot Picks",
                    comments: "",
                    filters: ["UK","custom"],
                    contributors: ["G4V","Accel"]
            },
            {
                    name: "Music Ally's Favourites across Western Europe",
                    comments: "",
                    filters: ["Music","custom"],
                    contributors: ["Music Ally"]
            },
                {
                    name: "Microsoft Accelerator's Top 5",
                    comments: "",
                    filters: ["Fintech","Spain"],
                    contributors: ["G4V","Microsoft Accelerator"]
            },
                
        ]
             
            }

        $scope.foo=null;



}])

    .controller('dealsCtrl', ['$scope', '$mdDialog', 'co_service', '$location', function ($scope, $mdDialog, co_service, $location) {

        $scope.seven_digital = false
        $scope.close_seven_digital = function(){
            $scope.seven_digital=true
        }
        $scope.four_iq = false
        $scope.close_four_iq = function(){
            $scope.four_iq=true
        }
        
        
        $scope.AdCash = "AdCash"
        $scope.Actility = "Actility"
        
        $scope.syndicate_dummy_company = function(company){
            $scope.syndication_company.Company=company    
            $scope.confirm_new_syndication();
        }
        
        
        $scope.syndication_company = {}
        
        $scope.selectedItemChange = function (item) {
            console.log(JSON.stringify(item))
            $scope.syndication_company = item
            //aleph.title = item.Company
            //aleph.description = item.Description
        }

        
        $scope.showDialog = function ($event) {


            $mdDialog.show({
                targetEvent: $event,
                controller: function ($scope) {
                    //          $scope.searchText = 'Enter a company';
                    $scope.items = co_service;
                },
                templateUrl: 'views/select_company_for_syndication.html',
                scope: $scope.$new()
            });
        };
        
        
        $scope.cancel_new_syndication = function () {
            $mdDialog.hide();
        }

        $scope.confirm_new_syndication = function () {
            $location.path('/newdeal').search({
                company: $scope.syndication_company.Company
            })
            $mdDialog.hide();
            
        };



}])


    
    .controller('newdealCtrl', ['$scope', '$mdDialog', 'co_service', '$location', function ($scope, $mdDialog, co_service, $location) {
        
        
         var db_entry = null

$scope.syndication_company = {}            

//Retrieves the 'database entry' from the company database service. Obviously this needs to be much more sophisticated

var company = $location.search().company

            co_service.some(function (entry) {
                if (entry.Company == company) {
                    db_entry = entry
                }
            });

            $scope.lead=false
            
            $scope.syndication_company.id = db_entry.ID
            console.log($scope.syndication_company.id)
            $scope.syndication_company.name = db_entry.Company
            $scope.syndication_company.geography = db_entry.IsoCountry1
            $scope.syndication_company.sector = db_entry.subsector
            $scope.syndication_company.stage = "A"
            $scope.syndication_company.motto = db_entry.Description

$scope.go_to_new_dr = function(){
                $location.path('/newdr').search({
                company: company,
                comitted: $scope.slider.minValue*10,
                open: ($scope.slider.maxValue-$scope.slider.minValue)*10
            })
}

$scope.go_back_to_deals = function(){
    $location.path('/deals')
}
        
$scope.slider = {
  minValue: 5.0,
  maxValue: 10.0,
  options: {
    floor: 0,
    ceil: 100,
    step: 0.1,
    precision: 1,
    translate: function(value, sliderId, label) {
      switch (label) {
        case 'model':
          return '<b>Committed by you:</b> $' + value.toLocaleString() + 'm';
        case 'high':
          return '<b>Total funding needed:</b> $' + value.toLocaleString() + 'm';
        default:
          return '$' + value.toLocaleString() +'m'
      }
    }
  }
};
}])


    .controller('newdrCtrl', ['$scope', '$mdDialog', '$location', function ($scope, $mdDialog, $location) {

        
        
        $scope.go_back_to_parameters = function(){
            $location.path('/newdeal').search({
                company: $location.search().company,
                comitted: $location.search().comitted,
                open: $location.search().open
            })
        }
       
    
           $scope.go_to_selectinvestors = function(){
            $location.path('/selectinvestors').search({
                  company: $location.search().company,
                comitted: $location.search().comitted,
                open: $location.search().open
            })
        }
       
    
    

}])


    .controller('selectinvestorsCtrl', ['$scope', '$mdDialog', 'my_investors', 'random_int','coidb', function ($scope, $mdDialog, my_investors, random_int,coidb) {

    $scope.my_investors = my_investors;
        
            $scope.myObj = {
        "color" : "white",
        "background-color" : "red",
    }
    

        $scope.match=false
        
        $scope.match_investors = function(){
            $scope.match=!$scope.match
        }
        $scope.coidb = coidb
        
              generate_fake_matches = function(list, min , max){
            
    for (var i=0; i<list.length; i++){        
        list[i].sector_match= random_int.getRandomInt(min,max)
        list[i].geography_match= random_int.getRandomInt(min,max)
        list[i].stage_match= random_int.getRandomInt(min,max)
        
        list[i].overall_match= ((list[i].sector_match+list[i].geography_match+list[i].stage_match)/3).toLocaleString({ maximumFractionDigits: 1 })
        
    }
        }

        generate_fake_matches($scope.my_investors,0,100)
        generate_fake_matches($scope.coidb,90,100)
        $scope.coidb_matches = $scope.coidb.splice(0,10)

}])

    .controller('pipelineCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {



}])



    .controller('profileCtrl', ['$scope', '$mdSidenav', '$http', '$location', 'co_service', function ($scope, $mdSidenav, $http, $location, co_service) {

        $scope.contributors=[{name:"Bob Cox", articles:20},{name:"Perry Kelso", articles:12}]
        //This works well and fine if we have a json file for each profile out there
        $scope.pro = {}

        
        console.log("this is profile controller")
        var company = $location.search().company
        console.log("arrived from elsewhere, company is: "+company)

        $http.get("example_profile.json").success(function (data) {
            
            var db_entry = null
            
            //Retrieves the 'database entry' from the company database service. Obviously this needs to be much more sophisticated
            co_service.some(function (entry) {
                if (entry.Company == company) {
                    db_entry = entry
                }
            });

            $scope.lead=false

            $scope.pro = data
            $scope.pro.id = db_entry.ID
            console.log($scope.pro.id)
            $scope.pro.name = db_entry.Company
            $scope.pro.geography = db_entry.IsoCountry1
            $scope.pro.sector = db_entry.subsector
            $scope.pro.stage = "A"
            $scope.pro.motto = db_entry.Description
        })

}])

    .controller('articleCtrl', ['$scope', '$mdSidenav', '$http', '$location', 'co_service', 'random_int', function ($scope, $mdSidenav, $http, $location, co_service, random_int) {
        
         $scope.go_to_profile = function (company) {
             
             
             
            $location.path('/profile').search({
                company: angular.isString(company)?company:company.Company
            })
             
            
        }
        
        $scope.fake_companies = []
        var number_of_fake_companies = random_int.getRandomInt(1,10)
        for (i=0;i<number_of_fake_companies;i++)
        {$scope.fake_companies.push(co_service[random_int.getRandomInt(0,933)])}
        
        $scope.fake_investors = []
        var number_of_fake_investors = random_int.getRandomInt(1,10)
        for (i=0;i<number_of_fake_investors;i++)
        {$scope.fake_investors.push(co_service[random_int.getRandomInt(933,co_service.length)])}
        
        $scope.article_company = $location.search().company
        $scope.article_type = $location.search().type

}])