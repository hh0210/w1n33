angular.module('starter.categories', [])

//CATEGORIES
.controller("categories", function($scope, $http) {

    //GET PRODUCT TYPE
    $http.get('http://staging.wine-enterprise.com:8011/apis/producttype')
      .then(function(response) {
        $scope.productTypeList = response.data;
        $scope.img = "http://placehold.it/50x50";
      }, function(err){
          console.error('ERR', err);
      })
});
