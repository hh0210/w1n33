angular.module('starter.cartlist', [])

//CART LIST
.controller("cartlist", function($scope, $http) {

    //GET CART ITEM
    // $http.get('http://staging.wine-enterprise.com:8011/apis/productlist')
    //   .then(function(response) {
    //     $scope.cartlist = response.data;
    //     $scope.img = "http://shared.wine-enterprise.com/upload/product/";
    //   }, function(err){
    //       console.error('ERR', err);
    //   })

	$scope.img = {
	    src: 'img/ionic.png'
	};

	$scope.cartData = [
		{"id": "18",
		 "sku_code": "BW002",
		 "name": "JOHNNIE WALKER BLACK LABEL 12 Y",
		 "id_productType": "4",
		 "status": "Active",
		 "created_on": "2015-06-24 02:18:13",
		 "type": "BLENDED WHISKEY",
		 "price": "168.00",
		 "year": "12",
		 "id_countryMaster": "2",
		 "origin": "scotland",
		 "note": "It comprises some 40 different malts and grains, R ...",
		 "alcohol": "40.00",
		 "size": "70CL",
		 "photo": "12345.png",
		 "balance": "0.00",
		 "quantity": "10",
		 "subtotal": "1680.00",
		 "total": "3360.00"
		}];
});
