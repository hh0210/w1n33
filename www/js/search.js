angular.module('starter.search', [])

.controller("search", function($scope, $http) {

	//SEARCH PRODUCT LIST
    $http.get('http://staging.wine-enterprise.com:8011/apis/productlist?code=')
	    .then(function(response) {
		    $scope.productList = response.data;
		    $scope.img = "http://shared.wine-enterprise.com/upload/product/";
		  }, function(err){
		      console.error('ERR', err);
		  })
});