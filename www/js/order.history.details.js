angular.module('starter.orderhistorydetails', [])

.controller("orderhistorydetails", function($scope, $http, $stateParams) {


	//temp
  	var apis = 'http://apis.wine-enterprise.com';
  	
	// user id
	var user_id = JSON.parse(localStorage.getItem('loginInfo')).id;
	console.log('user_id',user_id);

	// Get user id and order code to uniquely identify the different sales order.
    $http.get(apis+'/apis/order/details?user_id='+user_id+
    	'&order_code='+$stateParams.code)
	    .then(function(response) {
			$scope.OrderInfo = response.data;
			console.log('Order Details: ', $scope.OrderInfo);
		}, function(err){
		  	console.error('ERR', err);
		})
});