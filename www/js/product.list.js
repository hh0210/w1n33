angular.module('starter.productlist', [])

//CATEGORIES
.controller("productlist", function($scope, $http, $stateParams) {

    //GET PRODUCT LIST
    console.log('aaa',$stateParams.type_name);
    $http.get('http://staging.wine-enterprise.com:8011/apis/productlist?type_name='+$stateParams.type_name)
	    .then(function(response) {
		    $scope.productList = response.data;
		    $scope.img = "http://shared.wine-enterprise.com/upload/product/";
		  }, function(err){
		      console.error('ERR', err);
		  })
});
