angular.module('starter.billing', [])

//BILLING
.controller("billing", function($scope, $http, $state) {

	//cart id
	if(localStorage.getItem('cart_id') != null){
		var cart_id = JSON.parse(localStorage.getItem('cart_id'));
		console.log('current cart_id',cart_id);
	}else{
		var cart_id = '';
		console.log('current cart_id',cart_id);
	};

    //Send Billing form data
	$scope.billingForm = function(billing){
		$http({
		    method: 'POST',
		    url: 'http://staging.wine-enterprise.com:8011/apis/sales/order/person',
		    data: 'cart_id='+ cart_id + '&given_name=' + billing.firstName + '&family_name=' + billing.lastName
		          + '&email=' + billing.email + '&phone=' + billing.phone +
		           '&address=' + billing.address,
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    responseType :'json',
		}).then(function successCallback(response) {
			console.log('INFO', response);
			console.log('INFO', response.data.status);
	        console.log('INFO', response.data.billingInfo);
			$scope.toShipping = function() {
				$state.go('app.shipping');
			}
	        
		}, function errorCallback(response) {
			console.log('ERROR', response);

		});
	}
});