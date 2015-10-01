angular.module('starter.user', [])

//REGISTRATION
.controller("user", function($scope, $http) {

    //GET PRODUCT TYPE
    $http.post('http://staging.wine-enterprise.com:8011/apis/user/registration',
    	{username : '123'})
    	.success(function(response){
    		$scope.response = response.data;
    		console.log(response.data);
    	})



//LOGIN


});
