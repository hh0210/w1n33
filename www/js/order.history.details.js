angular.module('starter.orderhistorydetails', [])

.controller("orderhistorydetails", function($scope, $http, $stateParams) {

	// Only registered user can view order history.
	if(localStorage.getItem('loginInfo') != null){
		$scope.user = JSON.parse(localStorage.getItem('loginInfo'));
		var user_id = $scope.user.id;

	// Get user id and order code to uniquely identify the different sales order.
    $http.get('http://staging.wine-enterprise.com:8011/apis/orderhistory/details?user_id='+user_id+
    	'&order_code='+$stateParams.code)
	    .then(function(response) {
		    $scope.orderhistorydetails = response.data;
		    
		  }, function(err){
		      console.error('ERR', err);
		  })
	}
});