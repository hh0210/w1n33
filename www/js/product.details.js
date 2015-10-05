angular.module('starter.productdetails', [])

 // Product Details
.controller('productdetails', function($scope, $http, $stateParams) {

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
		    data: 'id_UserMaster=' + '1' + '&id_ProductMaster=' + '68' +
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


	// $scope.img = {
	//     src: 'img/ionic.png'
	// };

	// $scope.productData = [
	// 	{"id": "18",
	// 	 "sku_code": "BW002",
	// 	 "name": "JOHNNIE WALKER BLACK LABEL 12 Y",
	// 	 "id_productType": "4",
	// 	 "status": "Active",
	// 	 "created_on": "2015-06-24 02:18:13",
	// 	 "type": "BLENDED WHISKEY",
	// 	 "price": "168.00",
	// 	 "year": "12",
	// 	 "id_countryMaster": "2",
	// 	 "origin": "scotland",
	// 	 "note": "It comprises some 40 different malts and grains, R ...",
	// 	 "alcohol": "40.00",
	// 	 "size": "70CL",
	// 	 "photo": "12345.png",
	// 	 "balance": "0.00"
	// 	}];
	
});