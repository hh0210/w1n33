angular.module('starter.cartlist', [])

.controller("cartlist", function($scope, $http, $state, $ionicPopup, $timeout) {
	
	var cart_id = (localStorage.getItem('cart_id') != 'undefined')?JSON.parse(localStorage.getItem('cart_id')):'';
	console.log('cart_id', cart_id);

	var user_id = (localStorage.getItem('loginInfo') != 'undefined')?JSON.parse(localStorage.getItem('loginInfo')).id:'0';
	console.log('user_id',user_id);

	/*========== Listing ==========*/
    $http.get('http://staging.wine-enterprise.com:8011/apis/cart/list?cart_id='+cart_id)
		.then(function(response) {
			$scope.CartInfo = response.data;
			$scope.img = "http://shared.wine-enterprise.com/upload/product/100x100_";

			//session
			// localStorage.setItem('cart_id',JSON.stringify($stateParams.cart_id));
			// console.log('cartInfo', $scope.cartList);

		}, function(err){
			console.error('error', err);
	});

	/*========== Delete ==========*/
	$scope.delete = function(item) {
		$http({
			method: 'POST',
			url: 'http://staging.wine-enterprise.com:8011/apis/cart/list/delete',
			data: 'cartdetails_id='+item.id,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			responseType :'json',
		}).then(function successCallback(response) {
			console.log('status', response.data.status);
			$state.go('app.cartlist', {}, {reload: true});
		}, function errorCallback(response) {
			console.log('error', response);

		});
	};

    //Create Sales Order
	$scope.salesorder = function(cartList){
		$http({
		    method: 'POST',
		    url: 'http://staging.wine-enterprise.com:8011/apis/sales/order',
		    data: 'cart_id='+cart_id+'&user_id='+user_id,
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    responseType :'json',
		}).then(function successCallback(response) {
			console.log('status', response.data.status);
			console.log('sales_id: ', response.data.salesorder_id);
			$state.go('app.billing');
		}, function errorCallback(response) {
			console.log('error', response);

		});
	};

	$scope.showPopup = function() {
		var alertPopup = $ionicPopup.alert({
			title: 'Message',
			template: 'Insufficient Balance.'
   		});
   		alertPopup;
   		$timeout(function() {
			alertPopup.close(); 
		}, 1000);
	}

	// Add and minus function for product quantity.
	$scope.plus = function(item) {

		item.balance = parseInt(item.balance);
		item.qty = parseInt(item.qty);
		
		if(item.balance > item.qty){
			// Add the quantity by 1.
			
			item.qty++;

			// Each click '+' button, add the unit price with total price.
			var price = parseInt(item.unit_price);
		
			$http({
			    method: 'POST',
			    url: 'http://staging.wine-enterprise.com:8011/apis/cart/list/manageQty',
			    data: 'cartdetails_id='+item.id + '&product_id=' + item.product_id + '&qty='+ item.qty,
			    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			    responseType :'json',
			}).then(function successCallback(response) {
				console.log('status', response.data.status);
				$state.go('app.cartlist', {}, {reload: true});
				console.log("INFO Manage Qty");
			}, function errorCallback(response) {
				console.log('error', response);
			});
		}else{
			$scope.showPopup();
			// $state.go('app.cartlist', {}, {reload: true});
		}

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
			    data: 'cartdetails_id='+item.id + '&product_id=' + item.product_id + '&qty='+ item.qty,
			    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			    responseType :'json',
			}).then(function successCallback(response) {
				console.log('status', response.data.status);
				$state.go('app.cartlist', {}, {reload: true});
			}, function errorCallback(response) {
				console.log('error', response);
			});
    	}
  	};

});
