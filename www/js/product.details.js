angular.module('starter.productdetails', [])

 // Product Details
.controller('productdetails', function($scope, $http, $stateParams, $ionicPopup, $timeout) {
console.log('cart_id',JSON.parse(localStorage.getItem('cart_id')));
	//GET PRODUCT DETAILS
    $http.get('http://staging.wine-enterprise.com:8011/apis/productdetails?sku_code='+$stateParams.sku_code)
		.then(function(response) {
		$scope.productDetails = response.data;
		$scope.productDetails.qty = 1;
		$scope.img = "http://shared.wine-enterprise.com/upload/product/";
		}, function(err){
			console.error('ERR', err);
		});

	//user id
	var user_id = (localStorage.getItem('loginInfo'))?JSON.parse(localStorage.getItem('loginInfo')).id:'0';
	console.log('user_id',user_id);

	//  Popup Function for validation checking
   	$scope.showPopup = function(qty) {
   		if(qty > 0) {
			var alertPopup = $ionicPopup.alert({
				title: 'Message',
				template: 'Item successfully added to cart.'
	   		});
	   		alertPopup.then(function(res) {
			
	   		// Pass in state parameter that defined in app, then can go to different state.
	   		// $state.go('app.home');
	   		});
   		}else{
   		    var alertPopup = $ionicPopup.alert({
				title: 'Message',
				template: 'Please type quantity of product.'
			});
				alertPopup.then(function(res) {
			});
   		}

   		$timeout(function() {
			alertPopup.close(); 
		}, 2000);
	 };

	//add cart items
	$scope.cart = function(productDetails){
		$http({
		    method: 'POST',
		    url: 'http://staging.wine-enterprise.com:8011/apis/cart/list',
		    data: 'user_id=' + user_id + '&cart_id=' + cart_id +
		    	  '&product_id=' + productDetails.id + '&qty=' + productDetails.qty,
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    responseType :'json',
		}).then(function successCallback(response) {
	        localStorage.setItem('cart_id',JSON.stringify(response.data.cart_id));
			console.log('cart response: ', response.data);
		}, function errorCallback(response) {
			console.log('error', response);
		});
	}


	// cart id
	var cart_id = (localStorage.getItem('cart_id'))?JSON.parse(localStorage.getItem('cart_id')):'';
	console.log('cart_id',cart_id);

});