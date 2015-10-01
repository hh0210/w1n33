angular.module('starter.cartlist', [])

//CATEGORIES
.controller("cartlist", function($scope, $http) {

    //GET PRODUCT TYPE
    $http.get('http://staging.wine-enterprise.com:8011/apis/productlist')
      .then(function(response) {
        $scope.productList = response.data;
        $scope.img = "http://shared.wine-enterprise.com/upload/product/";
      }, function(err){
          console.error('ERR', err);
      })
});
