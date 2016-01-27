angular.module('starter.orderhistorydetails', [])

.controller("orderhistorydetails", function($scope, $http, $stateParams) {

	// user id
	var user_id = JSON.parse(localStorage.getItem('loginInfo')).id;
	console.log('user_id',user_id);

	// Get user id and order code to uniquely identify the different sales order.
    $http.get('http://staging.wine-enterprise.com:8011/apis/order/details?user_id='+user_id+
    	'&order_code='+$stateParams.code)
	    .then(function(response) {
			$scope.orderhistorydetails = response.data;
		}, function(err){
		  	console.error('ERR', err);
		})
});