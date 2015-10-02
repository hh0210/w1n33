angular.module('starter.user', [])

//REGISTRATION
.controller("user", function($scope, $http) {

    //GET PRODUCT TYPE
	console.error('INFO', 'A');
	$http({
	    method: 'POST',
	    url: 'http://staging.wine-enterprise.com:8011/apis/user/registration',
	    data: "username=" + 'username3' + Math.random() + '&password=' + 'passwod2',
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

 	// $http.post('http://staging.wine-enterprise.com:8011/apis/user/registration')
  //     .then(function(response) {
  //       $scope.test = response.data;
  //     }, function(err){
  //         console.error('ERR', err);
  //     })

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
