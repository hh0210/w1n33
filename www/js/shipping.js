angular.module('starter.shipping', [])

//SHIPPING
.controller("shipping", function($scope, $http, $stateParams, $state) {

	//cart id
	if(localStorage.getItem('cart_id') != null){
		var cart_id = JSON.parse(localStorage.getItem('cart_id'));
		console.log('current cart_id',cart_id);
	}else{
		var cart_id = '';
		console.log('current cart_id',cart_id);
	};

	//get shipment method
    $http.get('http://staging.wine-enterprise.com:8011/apis/sales/order/shipment/type')
      .then(function(response) {
        $scope.shipmentList = response.data;
        console.log(response);
        console.log('type',$scope.shipmentList);
      }, function(err){
          console.error('ERR', err);
      });

    //get shipment method
    $http.get('http://staging.wine-enterprise.com:8011/apis/sales/order/selfpickup/location')
      .then(function(response) {
        $scope.locationList = response.data;
        console.log(response);
        console.log('location',$scope.locationList);
      }, function(err){
          console.error('ERR', err);
      });


    //selection
	$scope.showSelectValue = function(mySelect) {
    	console.log(mySelect);
    	$scope.item_id = mySelect;
	}

    //Send shipping form data
	$scope.shipment = function(shipmentInfo){
		$http({
		    method: 'POST',
		    url: 'http://staging.wine-enterprise.com:8011/apis/sales/order/shipment',
		    data: 'cart_id='+ cart_id + '&given_name=' + shipmentInfo.given_name + '&family_name=' + shipmentInfo.family_name +
		          '&phone=' + shipmentInfo.phone + 
		          '&address=' + shipmentInfo.address1 + '\n' + shipmentInfo.address2 + '\n' + shipmentInfo.city + '\n' + shipmentInfo.codes +
		          '&id_SalesOrderShipmentType=' + $scope.item_id,
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    responseType :'json',
		}).then(function successCallback(response) {
			console.log('INFO', response);
			console.log('STATUS', response.data.status);

			$state.go('app.ordersummary');
	        
		}, function errorCallback(response) {
			console.log('ERROR', response);
		});
	}

	//Send selfpickup form data
	$scope.selfpickup = function(locationInfo){
		$http({
		    method: 'POST',
		    url: 'http://staging.wine-enterprise.com:8011/apis/sales/order/selfpickup',
		    data: 'cart_id='+ cart_id + '&id_SelfPickUpLocation=' + $scope.item_id,
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    responseType :'json',
		}).then(function successCallback(response) {
			console.log('INFO', response);
			console.log('STATUS', response.data.status);

			$state.go('app.ordersummary');
	        
		}, function errorCallback(response) {
			console.log('ERROR', response);
		});
	}

	// Retrieve billing user data to display at shipping page
	$scope.identifyUser = function(checkboxData) {

		// If user selected ship to himself, get all billing data.
		if (checkboxData === true) {
		$http({
			 url: 'http://staging.wine-enterprise.com:8011/apis/sales/order/person',
			 method: "GET",
			 params: {cart_id: cart_id}
		   })
	      .then(function(response) {
	        $scope.shipmentInfo = response.data;

	        // Split address by newline
	      	$scope.addressInfo = $scope.shipmentInfo.address.split("\n");
	      	$scope.shipmentInfo.address1 = $scope.addressInfo[0];
	      	$scope.shipmentInfo.address2 = $scope.addressInfo[1];
	      	$scope.shipmentInfo.city = $scope.addressInfo[2];
	      	$scope.shipmentInfo.codes = $scope.addressInfo[3];
	     
	      }, function(err){
	          console.error('ERR', err);
	      });
		} else{
			
			// Set all form fields to null.
			$scope.shipmentInfo.given_name = null;
			$scope.shipmentInfo.family_name = null;
			$scope.shipmentInfo.phone = null;
			$scope.shipmentInfo.address1 = null;
			$scope.shipmentInfo.address2 = null;
			$scope.shipmentInfo.city = null;
			$scope.shipmentInfo.codes = null;
		}
	} 
});
