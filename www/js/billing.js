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
		    data: 'cart_id='+ cart_id + '&given_name=' + billing.given_name + '&family_name=' + billing.family_name +
		          '&email=' + billing.email + '&phone=' + billing.phone +
		          '&address=' + billing.address1 + '\n' + billing.address2 + '\n' + billing.city + '\n' + billing.codes,
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    responseType :'json',
		}).then(function successCallback(response) {
			console.log('INFO', response);
			console.log('STATUS', response.data.status);
	        //console.log('INFO', response.data.billingInfo);
	        // localStorage.setItem('billingInfo',JSON.stringify(response.data.billingInfo));

			$state.go('app.shipping');
	        
		}, function errorCallback(response) {
			console.log('ERROR', response);
		});
	}

	//billing info
    $http.get('http://staging.wine-enterprise.com:8011/apis/sales/order/person?cart_id='+cart_id)
      .then(function(response) {
      	if(response.data.status == true){
	      	console.log('INFO', response.data);
	      	$scope.billing = response.data;

	      	//address split
	      	$scope.addressInfo = $scope.billing.address.split("\n");
	      	$scope.billing.address1 = $scope.addressInfo[0];
	      	$scope.billing.address2 = $scope.addressInfo[1];
	      	$scope.billing.city = $scope.addressInfo[2];
	      	$scope.billing.codes = $scope.addressInfo[3];
	      }else{
	      	console.log('problem');
	      }
      }, function(err){
          console.error('ERR', err);
      })
});