angular.module('starter.productdetails', [])

 // Product Details
.controller('productdetails', function($scope, $state, $http, $stateParams, $ionicPopup, $timeout) {


	//temp
  	var apis = 'http://apis.wine-enterprise.com';
  	
	//GET PRODUCT DETAILS
    $http.get(apis+'/apis/productdetails?sku_code='+$stateParams.sku_code)
		.then(function(response) {
		$scope.productDetails = response.data;
		$scope.productDetails.qty = 1;
		$scope.img = "http://shared.wine-enterprise.com/upload/product/320x320_";
		}, function(err){
			console.error('ERR', err);
		});

	//user id
	var user_id = (localStorage.getItem('loginInfo'))?JSON.parse(localStorage.getItem('loginInfo')).id:'0';
	console.log('user_id',user_id);

	//  Popup Function for validation checking
   	$scope.showPopup = function(qty) {
   		var balance = $scope.productDetails.balance-qty;
   		if(balance >= 0) {
			var alertPopup = $ionicPopup.alert({
				title: 'Message',
				template: 'Item successfully added to cart.'
	   		});
	   		alertPopup;
	   		$timeout(function() {
				alertPopup.close(); 
			}, 1000);
	   		return true;
   		}else if(qty > $scope.productDetails.balance){
   			var alertPopup = $ionicPopup.alert({
				title: 'Message',
				template: 'Insufficient Balance'
			});
			alertPopup;
	   		$timeout(function() {
				alertPopup.close(); 
			}, 1000);
			return false;
   		}else{
   		    var alertPopup = $ionicPopup.alert({
				title: 'Message',
				template: 'Please type quantity of product.'
			});
			alertPopup;
	   		$timeout(function() {
				alertPopup.close(); 
			}, 1000);
			return false;
   		}
	 };

	var cart_id = (localStorage.getItem('cart_id') != 'undefined')?JSON.parse(localStorage.getItem('cart_id')):'';
	console.log('cart_id', cart_id);


	//add cart items
	$scope.cart = function(productDetails){
		var status = $scope.showPopup(productDetails.qty);
		if(status == true) $scope.addcart(productDetails);
	}

	$scope.addcart = function(productDetails){
		$http({
		    method: 'POST',
		    url: apis+'/apis/cart/list',
		    data: 'user_id=' + user_id + '&cart_id=' + cart_id +
		    	  '&product_id=' + productDetails.id + '&qty=' + productDetails.qty,
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    responseType :'json',
		}).then(function successCallback(response) {
	        localStorage.setItem('cart_id',JSON.stringify(response.data.cart_id));
			console.log('cart response: ', response.data);
			$state.go('app.productdetails',{},{reload: true});
		}, function errorCallback(response) {
			console.log('error', response);
		});
	}

});