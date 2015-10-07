angular.module('starter.billing', [])

//BILLING
.controller("billing", function($scope, $http, $state) {

    //Send Billing form data
	$scope.billingForm = function(billing){
		$http({
		    method: 'POST',
		    url: 'http://staging.wine-enterprise.com:8011/apis/sales/order/person',
		    data: 'salesorder_id='+ '123' + '&given_name=' + billing.firstName + '&family_name=' + billing.lastName
		          + '&email=' + billing.email + '&phone=' + billing.phone +
		           '&address=' + billing.address,
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    responseType :'json',
		}).then(function successCallback(response) {
			console.log('INFO', response);
			console.log('INFO', response.data.status);
			console.log("###################################");
	        $scope.test = response.data;
	        
		}, function errorCallback(response) {
			console.log('ERROR', response);
			console.log('############# Error');
		});
	}

	$scope.toShipping = function() {
		console.log("### calling next page");
		$state.go('app.shipping');
	}

});