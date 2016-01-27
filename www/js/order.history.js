angular.module('starter.orderhistory', [])

.controller("orderhistory", function($scope, $http) {

	// user id
	var user_id = JSON.parse(localStorage.getItem('loginInfo')).id;
	console.log('user_id',user_id);

	// Get order history.
    $http.get('http://staging.wine-enterprise.com:8011/apis/order/history?user_id='+user_id)
	    .then(function(response) {
			$scope.OrderList = response.data;
			console.log('Order List: ', $scope.OrderList);
		}, function(err){
		  	console.error('ERR', err);
		})
});