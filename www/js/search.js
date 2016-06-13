angular.module('starter.search', [])

.controller("search", function($scope, $http, $state) {


	//temp
  	var apis = 'http://apis.wine-enterprise.com';
  	
	// keyword
	$scope.searchform = function(search){
		localStorage.setItem('keyword',JSON.stringify(this.keyword));
		$state.go('app.search', {}, {reload: true});
	}

	var keyword = (localStorage.getItem('keyword'))?JSON.parse(localStorage.getItem('keyword')):'';
	console.log('keyword: ', keyword);

	//SEARCH PRODUCT LIST
    $http.get(apis+'/apis/productlist?keyword='+keyword)
	    .then(function(response) {
		    $scope.productList = response.data;
		    $scope.keyword = keyword;
		    $scope.img = "http://shared.wine-enterprise.com/upload/product/320x320_";
		    console.log('Product List: ', $scope.productList); 
		    localStorage.removeItem('keyword');
		  }, function(err){
		      console.error('ERR', err);
		  })
});