angular.module('starter.ordersummary', [])

//ORDER SUMMARY
.controller("ordersummary", function($scope, $http) {

    //GET PRODUCT TYPE
    // $http.get('http://staging.wine-enterprise.com:8011/apis/productlist')
    //   .then(function(response) {
    //     $scope.productList = response.data;
    //     $scope.img = "http://shared.wine-enterprise.com/upload/product/";
    //   }, function(err){
    //       console.error('ERR', err);
    //   })


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
	},
		{"id": "20",
		 "sku_code": "MW004",
		 "name": "SCOTCH WHISKEY",
		 "id_productType": "5",
		 "status": "Active",
		 "created_on": "2015-07-25 02:18:13",
		 "type": "GRAINED WHISKEY",
		 "price": "228.00",
		 "year": "20",
		 "id_countryMaster": "3",
		 "origin": "usa",
		 "note": "It comprises some 50 different grains.",
		 "alcohol": "35.00",
		 "size": "50CL",
		 "photo": "1444.png",
		 "balance": "0.00",
		 "quantity": "5",
		 "subtotal": "1140.00",
		 "total": "2280.00"
	}
	];
});
