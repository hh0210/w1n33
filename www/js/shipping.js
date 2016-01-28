angular.module('starter.shipping', [])

.controller("shipping", function($scope, $http, $state) {

	// cart id
	var cart_id = (localStorage.getItem('cart_id') != 'undefined')?JSON.parse(localStorage.getItem('cart_id')):'';
	console.log('cart_id',cart_id);

	//shipment type list
    $http.get('http://staging.wine-enterprise.com:8011/apis/sales/order/shipment/type')
      .then(function(response) {
        $scope.ShipmentList = response.data;
        console.log('shipment list',$scope.ShipmentList);
	}, function(err){
	  console.error('error', err);
	});

    //location list
    $http.get('http://staging.wine-enterprise.com:8011/apis/sales/order/selfpickup/location')
      .then(function(response) {
        $scope.locationList = response.data;
        console.log('location list',$scope.locationList);
  	}, function(err){
          console.error('error', err);
	});

  	//get shipment info
    $http.get('http://staging.wine-enterprise.com:8011/apis/sales/order/shipment?cart_id='+cart_id)
      .then(function(response) {
		if(response.data.id) $scope.shipment = response.data;
        console.log('shipment info',$scope.shipment);
  	}, function(err){
          console.error('error', err);
	});

    //get selfpickup info
    $http.get('http://staging.wine-enterprise.com:8011/apis/sales/order/selfpickup?cart_id='+cart_id)
      .then(function(response) {
        if(response.data.id) $scope.selfpickupinfo = response.data;
        console.log('location info', $scope.selfpickupinfo);
  	}, function(err){
        console.error('error', err);
	});

    //selection
	$scope.showSelectValue = function(mySelect) {
    	$scope.item_id = mySelect;
    	console.log('shipment_id', $scope.item_id);
	}

    //post shipping data
	$scope.ShipmentForm = function(shipment){
		$http({
		    method: 'POST',
		    url: 'http://staging.wine-enterprise.com:8011/apis/sales/order/shipment',
		    data: 'cart_id='+ cart_id + '&given_name=' + shipment.given_name + '&family_name=' + shipment.family_name +
		          '&phone=' + shipment.phone + 
		          '&address1=' + shipment.address1 + '&address2=' + shipment.address2 +
              	  '&postcode=' + shipment.postcode + '&city=' + shipment.city +
              	  '&shipment_id=' + $scope.item_id,
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    responseType :'json',
		}).then(function successCallback(response) {
			console.log('success: ', response);
			$state.go('app.ordersummary', {}, {reload: true});
		}, function errorCallback(response) {
			console.log('error', response);
		});
	}

	//post selfpickup data
	$scope.selfpickup = function(locationInfo){
		$http({
		    method: 'POST',
		    url: 'http://staging.wine-enterprise.com:8011/apis/sales/order/selfpickup',
		    data: 'cart_id='+ cart_id + '&selfpickup_id=' + $scope.item_id,
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    responseType :'json',
		}).then(function successCallback(response) {
			console.log('success: ', response);
			$state.go('app.ordersummary', {}, {reload: true});
	        
		}, function errorCallback(response) {
			console.log('error', response);
		});
	}

	// retrieve billing user data
	$scope.identifyUser = function(checkboxData) {

		// select to get billing data
		if (checkboxData === true) {
		$http({
				url: 'http://staging.wine-enterprise.com:8011/apis/sales/order/person',
				method: "GET",
				params: {cart_id: cart_id}
			})
			.then(function(response) {
				$scope.shipment = response.data;
				console.log('shipment info', $scope.shipment);
			}, function(err){
				console.error('error', err);
			});
		}else{
			$scope.shipment = '';
		}
	} 
});
