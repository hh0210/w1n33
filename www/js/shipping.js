angular.module('starter.shipping', [])

//SHIPPING
.controller("shipping", function($scope, $http, $stateParams, $state) {

     //Send shipping form data
	$scope.shippingForm = function(shipping){
		$http({
		    method: 'POST',
		    url: 'http://staging.wine-enterprise.com:8011/apis/sales/order/shipment',
		    data: 'salesorder_id='+ '12345' + '&given_name=' + shipping.firstName + '&family_name=' + shipping.lastName
		          + '&email=' + shipping.email + '&phone=' + shipping.phone +
		           '&address=' + shipping.address,
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

	$scope.toPayment = function() {
		console.log("### calling to payment");
		$state.go('app.payment');
	}

});
