angular.module('starter.productlist', [])

//CATEGORIES
.controller("productlist", function($scope, $http, $stateParams) {

    //GET PRODUCT LIST
    $http.get('http://staging.wine-enterprise.com:8011/apis/productlist?code='+$stateParams.code)
	    .then(function(response) {
		    $scope.productList = response.data;
		    $scope.img = "http://shared.wine-enterprise.com/upload/product/320x320_";
		  }, function(err){
		      console.error('ERR', err);
		  })
});
