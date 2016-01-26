angular.module('starter.billing', [])

.controller("billing", function($scope, $http, $state) {

	// cart id
	var cart_id = (localStorage.getItem('cart_id'))?JSON.parse(localStorage.getItem('cart_id')):'';
	console.log('cart_id',cart_id);

	// user id
	var user_id = (localStorage.getItem('loginInfo'))?JSON.parse(localStorage.getItem('loginInfo')).id:'0';
	console.log('user_id',user_id);


	// billing info
	$http.get('http://staging.wine-enterprise.com:8011/apis/sales/order/person?cart_id='+cart_id+'&user_id='+user_id)
	.then(function(response) {
		if(response.data.id) $scope.billing = response.data;
		console.log('billing info', $scope.billing);
	}, function(err){
		console.error('error', err);
	})

    // submit billing info
	$scope.BillingForm = function(billing){
		$http({
		    method: 'POST',
		    url: 'http://staging.wine-enterprise.com:8011/apis/sales/order/person',
		    data: 'cart_id='+ cart_id + '&given_name=' + billing.given_name + '&family_name=' + billing.family_name +
		          '&email=' + billing.email + '&phone=' + billing.phone +
		          '&address1=' + billing.address1 + '&address2=' + billing.address2 +
              	  '&postcode=' + billing.postcode + '&city=' + billing.city,
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    responseType :'json',
		}).then(function successCallback(response) {
			console.log('success: ', response);
			$state.go('app.shipping');
		}, function errorCallback(response) {
			console.log('error', response);
		});
	}

	
});