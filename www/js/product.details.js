angular.module('starter.productdetails', [])

 // Product Details
.controller('productdetails', function($scope, $http, $stateParams, $ionicPopup, $timeout) {

	//GET PRODUCT DETAILS
    $http.get('http://staging.wine-enterprise.com:8011/apis/productdetails?sku_code='+$stateParams.sku_code)
		.then(function(response) {
		$scope.productDetails = response.data;
		$scope.img = "http://shared.wine-enterprise.com/upload/product/";
		}, function(err){
			console.error('ERR', err);
		});


	//cart id
	if(localStorage.getItem('cart_id') != null){
		var cart_id = JSON.parse(localStorage.getItem('cart_id'));
		console.log('current cart_id',cart_id);
	}else{
		var cart_id = '';
		console.log('current cart_id',cart_id);
	};

	//user id
	if(localStorage.getItem('loginInfo') != null){
		$scope.user = JSON.parse(localStorage.getItem('loginInfo'));
		var user_id = $scope.user.id;
		console.log('localstorage USER ID',user_id);
	}else{
		var user_id = '0';
		console.log('localstorage USER ID',user_id);
	}

	//  Popup Function for validation checking
	   $scope.showPopup = function(qty) {
	   		console.log(qty);
	   		console.log("#####");
	   		if((qty === 0)||(qty === undefined)||(qty === null)) {
	   			console.log("wrong quantity");
	   		    var alertPopup = $ionicPopup.alert({
			     title: 'Message',
			     template: 'Please type quantity of product.'
			   });
			   alertPopup.then(function(res) {
			   	 var form = document.getElementsByName('contact-form');
			   });
	   		}
	   		else{
	   			console.log("got quantity");
	   			var alertPopup = $ionicPopup.alert({
			     title: 'Message',
			     template: 'Item successfully added to cart.'
			   });
			   alertPopup.then(function(res) {
					
			   		// Pass in state parameter that defined in app, then can go to different state.
			   		// $state.go('app.home');
			   });
	   		}

	   		$timeout(function() {
				alertPopup.close(); 
			}, 2000);
	 };

	 //POST CART LIST
	$scope.cart = function(productDetails){
		console.log('CART ID',cart_id);
		console.log('USER ID',user_id);
		$http({
		    method: 'POST',
		    url: 'http://staging.wine-enterprise.com:8011/apis/cart/list',
		    data: 'id_UserMaster=' + user_id + '&id_ProductMaster=' + productDetails.id +
		    	  '&price=' + productDetails.price + '&qty=' + productDetails.qty + 
		    	  '&cart_id=' + cart_id,
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    responseType :'json',
		}).then(function successCallback(response) {
	        localStorage.setItem('cart_id',JSON.stringify(response.data.cart_id));
			console.log('INFO', response);
			console.log('INFO', response.data.status);
			console.log('INFO', response.data.cart_id);
		}, function errorCallback(response) {
			console.log('ERROR', response);
			console.log(cart_id);
		});
	}

	 // $scope.addQty = function(qty) {
	 // 	var add = 0;
	 // 	add = parseInt(qty) + 1;
	 // 	console.log(add);
	 // 	console.log("add value is #######");

	 // 	productDetails.qty.$setViewValue(add);
	 // };

	 // $scope.minusQty = function(qty) {
	 // 	var minus = 0;
	 // 	minus = parseInt(qty) - 1;
	 // 	console.log(minus);
	 // 	console.log("minus value is #######");
	 // };
});