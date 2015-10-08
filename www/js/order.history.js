angular.module('starter.orderhistory', [])

.controller("orderhistory", function($scope, $http) {

	// Only registered user can view order history.
	if (localStorage.getItem('loginInfo') != null) {
		$scope.user = JSON.parse(localStorage.getItem('loginInfo'));
		var user_id = $scope.user.id;
		console.log('localstorage USER ID',user_id);

	// Get order history.
    $http.get('http://staging.wine-enterprise.com:8011/apis/orderhistory?user_id='+user_id)
	    .then(function(response) {
		    $scope.orderhistory = response.data;

		    console.log($scope.orderhistory);
		    console.log("##############");
		  }, function(err){
		      console.error('ERR', err);
		  })
	} 
});