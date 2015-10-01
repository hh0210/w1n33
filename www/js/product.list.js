angular.module('starter.productlist', [])

//CATEGORIES
.controller("productlist", function($scope, $http) {
 
    $scope.images = [];
 
    $scope.loadImages = function() {
        for(var i = 0; i < 8; i++) {
            $scope.images.push({id: i, src: "http://placehold.it/50x50"});
        }
    }

    //GET PRODUCT TYPE
    $http.get('http://staging.wine-enterprise.com:8011/apis/producttype')
      .then(function(response) {
        $scope.productTypeList = response.data;
        $scope.img = "http://placehold.it/50x50";
      }, function(err){
          console.error('ERR', err);
      })
});
