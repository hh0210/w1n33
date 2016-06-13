angular.module('starter.orderhistory', [])

.controller("orderhistory", function($scope, $http) {

	//temp
  	var apis = 'http://apis.wine-enterprise.com';
  	
	// user id
	var user_id = JSON.parse(localStorage.getItem('loginInfo')).id;
	console.log('user_id',user_id);

	// Get order history.
    $http.get(apis+'/apis/order/history?user_id='+user_id)
	    .then(function(response) {
			$scope.OrderList = response.data;
			console.log('Order List: ', $scope.OrderList);
		}, function(err){
		  	console.error('ERR', err);
		})
});