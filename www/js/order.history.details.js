angular.module('starter.orderhistorydetails', [])

.controller("orderhistorydetails", function($scope, $http) {

	// Only registered user can view order history.
	if(localStorage.getItem('loginInfo') != null){
		$scope.user = JSON.parse(localStorage.getItem('loginInfo'));
		var user_id = $scope.user.id;
		console.log('localstorage USER ID',user_id);

	// Get order history and proceed to order history details.
    $http.get('http://staging.wine-enterprise.com:8011/apis/orderhistory?user_id='+user_id)
	    .then(function(response) {
		    $scope.orderhistorydetails = response.data;

		    console.log($scope.orderhistorydetails);
		    console.log("#######order odrer#######");
		  }, function(err){
		      console.error('ERR', err);
		  })
	}
});