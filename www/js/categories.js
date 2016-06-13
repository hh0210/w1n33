angular.module('starter.categories', [])

//CATEGORIES
.controller("categories", function($scope, $http) {

	//temp
  	var apis = 'http://apis.wine-enterprise.com';

    //GET PRODUCT TYPE
    $http.get(apis+'/apis/producttype')
      .then(function(response) {
        $scope.productTypeList = response.data;
        // $scope.img = "http://shared.wine-enterprise.com/upload/product/";
      }, function(err){
          console.error('ERR', err);
      })
});
