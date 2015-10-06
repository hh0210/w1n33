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

	//POST CART LIST
	$scope.cart = function(productDetails){
		$http({
		    method: 'POST',
		    url: 'http://staging.wine-enterprise.com:8011/apis/cart/list',
		    data: 'id_UserMaster=' + '0' + '&id_ProductMaster=' + productDetails.id +
		    	  '&price=' + productDetails.price + '&qty=' + productDetails.qty,
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    responseType :'json',
		}).then(function successCallback(response) {
			console.log('INFO', response);
			console.log('INFO', response.data.status);
	        $scope.test = response.data;
		}, function errorCallback(response) {
			console.log('ERROR', response);
		});
	}

	//  Popup Function
	   $scope.showPopup = function() {
	   var alertPopup = $ionicPopup.alert({
	     title: 'Message',
	     template: 'Item successfully added to cart.'
	   });
	   alertPopup.then(function(res) {
			
	   		// Pass in state parameter that defined in app, then can go to different state.
	   		// $state.go('app.home');
	   });
		$timeout(function() {
			//close the popup after 2 seconds 
			alertPopup.close(); 
		}, 2000);
	 };
});