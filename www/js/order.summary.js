angular.module('starter.ordersummary', [])

.controller("ordersummary", function($scope, $http, $state) {

	// cart id
	var cart_id = (localStorage.getItem('cart_id'))?JSON.parse(localStorage.getItem('cart_id')):'';
	console.log('cart_id',cart_id);

	// user id
	// var user_id = (localStorage.getItem('loginInfo'))?JSON.parse(localStorage.getItem('loginInfo')):'0';
	// console.log('user_id',user_id);

    //get sales order
    $http.get('http://staging.wine-enterprise.com:8011/apis/sales/order?cart_id='+cart_id)
      .then(function(response) {
        $scope.SalesInfo = response.data;
        console.log('sales info', $scope.SalesInfo);

        $scope.img = "http://shared.wine-enterprise.com/upload/product/";

		}, function(err){
		  console.error('error', err);
	});

    //billing info
    $http.get('http://staging.wine-enterprise.com:8011/apis/sales/order/person?cart_id='+cart_id)
	.then(function(response) {
		$scope.email = response.data.email;
		console.log('email: ', response.data.email);
	}, function(err){
	  console.error('error', err);
	})

	$scope.invoice = function(salesinfo){
		$http({
		    method: 'POST',
		    url: 'http://staging.wine-enterprise.com:8011/apis/invoice',
		    data: 'sales_id=' + $scope.SalesInfo.id + '&user_id=' + $scope.SalesInfo.id_UserMaster + '&email=' + $scope.email,
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    responseType :'json',
		}).then(function successCallback(response) {
			console.log('success: ', response);
			localStorage.removeItem('cart_id'); //remove session
		  	var cart_id = (localStorage.getItem('cart_id'))?JSON.parse(localStorage.getItem('cart_id')):'';
		  	console.log('cart_id',cart_id);
			$state.go('app.payment');
		}, function errorCallback(response) {
			console.log('error', response);
		});
	}

});
