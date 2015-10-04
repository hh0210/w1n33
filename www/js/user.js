angular.module('starter.user', [])


.controller("user", function($scope, $http) {

	//SIGN UP
	// console.error('INFO', 'A');
	$scope.signup = function(userdata){
		$http({
		    method: 'POST',
		    url: 'http://staging.wine-enterprise.com:8011/apis/user/registration',
		    data: "username=" + userdata.username + '&password=' + userdata.password,
		    // data: {"username=":'username1','password=':'passwod1'},
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    // headers: {'Content-Type': 'application/json'}
		    responseType :'json',
		}).then(function successCallback(response) {
			console.log('INFO', response);
			console.log('INFO', response.data.status);
	        $scope.test = response.data;
		}, function errorCallback(response) {
			console.log('ERROR', response);
		});
	}

//LOGIN
	$scope.loginData = {
    	username: '',
    	password: ''
    };

    $scope.signIn = function(form) {
    	if (form.$valid) {
    		$state.go('home');
    	}
    };


});
