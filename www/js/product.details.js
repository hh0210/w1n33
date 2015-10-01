angular.module('starter.productdetails', [])

 // Product Details
.controller('productdetails', function($scope) {
  
  // $scope.images = [];
 
  //   $scope.loadImages = function() {
  //       for(var i = 0; i < 8; i++) {
  //           $scope.images.push({id: i, src: "http://placehold.it/50x50"});
  //       }
  //   }

  //   //GET PRODUCT TYPE
  //   $http.get('http://staging.wine-enterprise.com:8011/apis/producttype')
  //     .then(function(response) {
  //       $scope.productTypeList = response.data;
  //       $scope.img = "http://placehold.it/50x50";
  //     }, function(err){
  //         console.error('ERR', err);
  //     })

	$scope.img = {
	    src: 'img/ionic.png'
	};

	$scope.productData = [
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
		 "balance": "0.00"
		}];
	
});