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
                    $location.url("/help");
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
                label: "Research",
                icon: "subject",
                url: "/research"
        },
            {
                label: "Investment Management",
                icon: "work",
                url: "/inv"
        },
            {
                label: "My Profile",
                icon: "face",
                url: "/me"
        },
            {
                label: "Help",
                icon: "help",
                url: "/help"
        }
    ]

}])

    .controller('alphaCtrl', ['$scope', '$mdSidenav', '$http', '$location', '$timeout', 'co_service', function ($scope, $mdSidenav, $http, $location, $timeout, co_service) {

        //$timeout(foo,1000)

        function foo() {
            alert("new JS file!")
        }

        $scope.accordianData = [
            {
                heading: "SECTORS",
                filters: [
                    {
                        title: "Adtech",
                        ticked: false
                },
                    {
                        title: "Badtech",
                        ticked: false
                },
                    {
                        title: "CADtech",
                        ticked: false
                },
                    {
                        title: "Edtech",
                        ticked: false
                },
                    {
                        title: "Fadtech",
                        ticked: false
                }]
		},
            {
                heading: "GEOGRAPHY",
                filters: [
                    {
                        title: "Germany",
                        ticked: false
                },
                    {
                        title: "France",
                        ticked: false
                },
                    {
                        title: "Austria",
                        ticked: false
                },
                    {
                        title: "Switzerland",
                        ticked: false
                },
                    {
                        title: "Sweden",
                        ticked: false
                },
                    {
                        title: "Spain",
                        ticked: false
                }]
        },
            {
                heading: "SERIES",
                filters: [
                    {
                        title: "Seed",
                        ticked: false
                },
                    {
                        title: "A",
                        ticked: false
                },
                    {
                        title: "B",
                        ticked: false
                },
                    {
                        title: "C",
                        ticked: false
                },
                    {
                        title: "Late",
                        ticked: false
                }]
        }
	   ];


        $scope.go_to_inv = function () {
            $location.path('/inv')
        }

        $scope.go_to_article = function (article) {

            $location.path('/article').search({
                company: article.company,
                type: article.subject
            })

        }


        $scope.company_lists = null;
        $http.get('my_companies.json').success(function (data) {
            $scope.company_lists = data
        })

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



        $scope.openLeftMenu = function () {
            $mdSidenav('left').toggle();
        };
        $scope.openRightMenu = function () {
            $mdSidenav('right').toggle();
        };


        function replace(dataset) {
            var entry

            if ($scope.company_lists != null) {

                for (entry of dataset.followed) {
                    entry.company = $scope.company_lists[getRandomInt(0, 2)].companies[getRandomInt(0, 2)].title
                }
            }
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }



        $scope.fullfeed = null
        $scope.list_loaded = false


        $http.get('feed.json').success(function (data) {
            $scope.fullfeed = data
            $scope.mode = 0
            $scope.list_loaded = true
            replace($scope.fullfeed)
        })



}])

    .controller('invCtrl', ['$scope', '$mdDialog', '$http', function ($scope, $mdDialog, $http) {

        $scope.hardy = function (list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].ticked == true) {
                    list.splice(i, 1)
                }
            }
            if (list.length == 1 && list[0].ticked) {
                list.splice(0, 1)
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



        var companies = null

        $http.get('companies.json').success(function (data) {

            companies = data
        }).error(function (data) {
            console.log(data.message)
        })


        var affected_list = 0

        $scope.showDialog = function ($event, index) {
            affected_list = index
            console.log("affected list should be: " + affected_list)

            $mdDialog.show({
                targetEvent: $event,
                controller: function ($scope) {
                    //          $scope.searchText = 'Enter a company';
                    $scope.items = companies;
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

        $scope.hardy = function (list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].ticked == true) {
                    list.splice(i, 1)
                }
            }
            if (list.length == 1 && list[0].ticked) {
                list.splice(0, 1)
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




}])


    .controller('busiCtrl', ['$scope', '$mdDialog', '$http', 'co_service', function ($scope, $mdDialog, $http, co_service) {

        $scope.countries = null

        $http.get('countries.json').success(function (data) {

            $scope.countries = data
        }).error(function (data) {
            console.log(data.message)
        })



        $scope.f = [{
            "GBR": false
    }, {
            "FRA": false
    }, {
            "DNK": false
    }]

        $scope.companies = co_service




        $scope.openLeftMenu = function () {
            $mdSidenav('left').toggle();
        };


}])

    .controller('researchCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {


        $scope.channel_lists =

        [
                {
                    channel: "Microsoft Ventures's Hot Picks",
                    img: "img/msftven_logo.png"
            },
                {
                    channel: "Fintech in Spain by Group Olivo",
                    img: "img/olivo_logo.png"
            },
                {
                    channel: "Deeptech by Cisco",
                    img: "img/cisco_logo.png"
            },
                {
                    channel: "Insurtech by Aviva",
                    img: "img/aviva_logo.png"
            },
                {
                    channel: "Early Stage by 500startups",
                    img: "img/500startups_logo.png"
            },
                {
                    channel: "Terraforming Technology by Weyland Yutani",
                    img: "img/WYC_logo.png"
            }
        ]


}])

    .controller('helpCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {



}])

    .controller('profileCtrl', ['$scope', '$mdSidenav', '$http', '$location', 'co_service', function ($scope, $mdSidenav, $http, $location, co_service) {



        //This works well and fine if we have a json file for each profile out there
        $scope.pro = {}



        var company = $location.search().company

        $http.get("example_profile.json").success(function (data) {
            var db_entry = null

            co_service.some(function (entry) {
                if (entry.Company == company) {
                    db_entry = entry
                }
            });


            $scope.pro = data
            $scope.pro.name = db_entry.Company
            $scope.pro.geography = db_entry.IsoCountry1
            $scope.pro.sector = db_entry.subsector
            $scope.pro.stage = "A"
            $scope.pro.motto = db_entry.Description
        })

}])

    .controller('articleCtrl', ['$scope', '$mdSidenav', '$http', '$location', function ($scope, $mdSidenav, $http, $location) {

        $scope.article_company = $location.search().company
        $scope.article_type = $location.search().type



}])