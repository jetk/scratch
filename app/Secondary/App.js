//JS Code for Side Nav here
angular.module('anApp', ['ngMaterial'])
		.controller('mainCtrl',['$scope', '$mdSidenav', function($scope,$mdSidenav)
			{
 $scope.myClass = "md-sidenav-left md-whiteframe-z2";
 $scope.option1 = "md-sidenav-opened md-whiteframe-z2";

        $scope.toggleFlag= true;
		
    $scope.edit = true;
 $scope.hoverEdit = false;
 $scope.size = "5";
		   
		
    $scope.toggleClass = function() {
	if( $scope.myClass == "md-sidenav-left md-whiteframe-z2" )
	
		{
			$scope.myClass = "md-sidenav-opened md-whiteframe-z2";
		    $scope.toggleFlag = false;
			$scope.size = "25";
		}
    else 
		{
			$scope.myClass = "md-sidenav-left md-whiteframe-z2";
		    $scope.toggleFlag = true;
			$scope.size = "5";
			
		}
    }
	
		
		   
		   $scope.toggleSidenav = function(menuId) {
			  $scope.hoverEdit = true;
			  
		   };

		  $scope.hoverIn = function(){
			  if($scope.toggleFlag)
			  {
				  $scope.hoverEdit = true;
				$scope.edit = false;
			  }
			

		  };

		  $scope.hoverOut = function(){
			if($scope.toggleFlag)
			  {
				  $scope.hoverEdit = false;
					$scope.edit = true;
			  }
		  };

		  }]);
