angular.module('starter.cartlist', [])

.controller("cartlist", function($scope, $http, $stateParams, $state) {
	
	var user_id = (localStorage.getItem('loginInfo'))?JSON.parse(localStorage.getItem('loginInfo')):'0';
	console.log('user_id',user_id);

	/*========== Listing ==========*/
    $http.get('http://staging.wine-enterprise.com:8011/apis/cart/list?cart_id='+$stateParams.cart_id)
		.then(function(response) {
			$scope.CartInfo = response.data;
			// $stateParams.cart_id = $scope.cartList[0].id; delete if no use
			$scope.img = "http://shared.wine-enterprise.com/upload/product/";

			//session
			localStorage.setItem('cart_id',JSON.stringify($stateParams.cart_id));
			console.log('cartInfo', $scope.cartList);

		}, function(err){
			console.error('error', err);
	})

	/*========== Delete ==========*/
	$scope.delete = function(cartInfo) {
		$http({
			method: 'POST',
			url: 'http://staging.wine-enterprise.com:8011/apis/cart/list/delete',
			data: 'cart_id='+$stateParams.cart_id + '&id_ProductMaster=' +cartInfo.product_id,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			responseType :'json',
		}).then(function successCallback(response) {
			console.log('INFO', response);
			console.log('STATUS', response.data.status);
			$state.go('app.cartlist', {}, {reload: true});
		}, function errorCallback(response) {
			console.log('ERROR', response);

		});
	}

    //Create Sales Order
	$scope.salesorder = function(cartList){
		$http({
		    method: 'POST',
		    url: 'http://staging.wine-enterprise.com:8011/apis/sales/order',
		    data: 'cart_id='+$stateParams.cart_id,
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    responseType :'json',
		}).then(function successCallback(response) {
			console.log('INFO', response);
			console.log('STATUS', response.data.status);
			console.log('current salesorder_id', response.data.salesorder_id);
			$state.go('app.billing');
		//})
		}, function errorCallback(response) {
			console.log('ERROR', response);

		});
	}

	// Add and minus function for product quantity.
	$scope.plus = function(item) {
		 // Add the quantity by 1.
		 item.qty = parseInt(item.qty);
		 item.qty++;

		 // Each click '+' button, add the unit price with total price.
		 var price = parseInt(item.unit_price);

		 $http({
		    method: 'POST',
		    url: 'http://staging.wine-enterprise.com:8011/apis/cart/list/manageQty',
		    data: 'cart_id='+$stateParams.cart_id + '&id_ProductMaster=' + item.product_id + '&qty='+ item.qty
		          + '&price='+ price,
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    responseType :'json',
		}).then(function successCallback(response) {
			console.log('INFO', response);
			console.log('STATUS', response.data.status);
			$state.go('app.cartlist', {}, {reload: true});
			console.log("INFO Manage Qty");
		}, function errorCallback(response) {
			console.log('ERROR', response);
		});

  	};
  	
  	$scope.minus = function(item) {
  		item.qty = parseInt(item.qty);
    	if (item.qty > 1) {

		     // Minus the quantity by 1.
		     item.qty--;

			 // Each click '+' button, add the unit price with total price.
			 var price = parseInt(item.unit_price);

			 $http({
			    method: 'POST',
			    url: 'http://staging.wine-enterprise.com:8011/apis/cart/list/manageQty',
			    data: 'cart_id='+$stateParams.cart_id + '&id_ProductMaster=' + item.product_id + '&qty='+ item.qty
			          + '&price='+ price,
			    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			    responseType :'json',
			}).then(function successCallback(response) {
				console.log('INFO', response);
				console.log('STATUS', response.data.status);
				
				$state.go('app.cartlist', {}, {reload: true});

			}, function errorCallback(response) {
				console.log('ERROR', response);
			});
    	}
  	};

});
