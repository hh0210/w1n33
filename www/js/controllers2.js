angular.module('starter.controllers2', [])
.controller('HomeController', function($scope, $http, $state, $ionicTabsDelegate) {
    
  //logo
  $scope.TitleImg='<img class="img-small ml20" src="img/logo/logo.png" />';

  //categories
  $http.get('http://staging.wine-enterprise.com:8011/apis/producttype')
  .then(function(response) {
    $scope.productTypeList = response.data;
  }, function(err){
      console.error('ERR', err);
  })
  
  $scope.searchform = function(search){
    localStorage.setItem('keyword',JSON.stringify(this.keyword));
    $state.go($state.current, {}, {reload: true});
  }

  var keyword = (localStorage.getItem('keyword'))?JSON.parse(localStorage.getItem('keyword')):'';
  console.log('keyword: ', keyword);

  $http.get('http://staging.wine-enterprise.com:8011/apis/productlist?keyword='+keyword)
  .then(function(response) {
    $scope.productList = response.data;
    $scope.keyword = keyword;
    $scope.img = "http://shared.wine-enterprise.com/upload/product/320x320_";
    $ionicTabsDelegate.$getByHandle('home-tab').select(1); //how to utilise? redirect, another tab, require timeout
  }, function(err){
    console.error('ERR', err);
  })
   	
});