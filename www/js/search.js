angular.module('starter.search', [])

.controller("search", function($scope, $http, $state) {

	// keyword
	$scope.searchform = function(search){
		localStorage.setItem('keyword',JSON.stringify($scope.keyword));
		$state.go('app.search', {}, {reload: true});
	}

	var keyword = (localStorage.getItem('keyword') != 'undefined')?JSON.parse(localStorage.getItem('keyword')):'';
	console.log('keyword: ', keyword);

	//SEARCH PRODUCT LIST
    $http.get('http://staging.wine-enterprise.com:8011/apis/productlist?keyword='+keyword)
	    .then(function(response) {
		    $scope.productList = response.data;
		    $scope.keyword = keyword;
		    $scope.img = "http://shared.wine-enterprise.com/upload/product/320x320_";
		    console.log('Product List: ', $scope.productList); 
		  }, function(err){
		      console.error('ERR', err);
		  })
});