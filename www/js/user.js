angular.module('starter.user', [])

//REGISTRATION
.controller("user", function($scope, $http, $ionicPopup, $state) {

    //GET PRODUCT TYPE
 	$http.post('http://staging.wine-enterprise.com:8011/apis/user/registration')
      .then(function(response) {
        $scope.test = response.data;
      }, function(err){
          console.error('ERR', err);
      })

//LOGIN
	$scope.loginData = {
    	username: '',
    	password: '',
      src: 'img/ionic.png'
    };

    $scope.signIn = function(form) {
    	if (form.$valid) {
        // Redirect to another path, name home.
    		$state.go('home');
    	}
    };

//FORGOT PASSWORD
 $scope.showPopup = function() {
    $scope.data = {}

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<input type="text">',
      title: 'Reset Password',
      subTitle: 'Please enter your email address.',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Reset',
          type: 'button-positive',
          onTap: function(e) {
          //   if (!$scope.data.wifi) {
          //     //don't allow the user to close unless he enters wifi password
          //     e.preventDefault();
          //   } else {
          //     return $scope.data.wifi;
          //   }
             console.log("you click the cancel or reset already");
          }
        }
      ]
    });
    myPopup.then(function(res) {
      console.log('Tapped!', res);
    });
    // $timeout(function() {
    //    myPopup.close(); //close the popup after 3 seconds for some reason
    // }, 3000);
   };
});
