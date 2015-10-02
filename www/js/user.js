angular.module('starter.user', [])

//REGISTRATION
.controller("user", function($scope, $http) {

    //GET PRODUCT TYPE

        console.log('aaaa');
 	$http.post('http://staging.wine-enterprise.com:8011/apis/user/registration')
      .then(function(response) {
        $scope.test = response.data;
      }, function(err){
          console.error('ERR', err);
      })


//LOGIN


});
