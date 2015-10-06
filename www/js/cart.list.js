angular.module('starter.cartlist', [])

//CART LIST
.controller("cartlist", function($scope, $http) {

    //GET CART ITEM
     $http.get('http://staging.wine-enterprise.com:8011/apis/cart/list')
      .then(function(response) {
        $scope.cartList = response.data;
        $scope.img = "http://shared.wine-enterprise.com/upload/product/";
        console.log(response);
      }, function(err){
          console.error('ERR', err);
      })
});
