angular.module('starter.controllers2', [])
.controller('HomeController', function($scope, $http, $state, $ionicTabsDelegate) {
  
  //temp
  var apis = 'http://apis.wine-enterprise.com';

  //logo
  $scope.TitleImg='<img class="img-small ml20" src="img/logo/logo.png" />';

  //categories
  $http.get(apis+'/apis/producttype')
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

  $http.get(apis+'/apis/productlist?keyword='+keyword)
  .then(function(response) {
    $scope.productList = response.data;
    $scope.keyword = keyword;
    $scope.img = "http://shared.wine-enterprise.com/upload/product/320x320_";
    if(keyword) $ionicTabsDelegate.$getByHandle('home-tab').select(1);
    localStorage.removeItem('keyword');
  }, function(err){
    console.error('ERR', err);
  })
   	
});