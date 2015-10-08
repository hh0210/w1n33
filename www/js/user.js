angular.module('starter.user', ['ngMessages'])

//REGISTRATION
.controller("user", function($scope, $http, $ionicPopup, $state) {

	//SIGN UP
	// console.error('INFO', 'A');
	$scope.signup = function(userdata){
		$http({
		    method: 'POST',
		    url: 'http://staging.wine-enterprise.com:8011/apis/user/registration',
		    data: 'username=' + userdata.username + '&email=' + userdata.email +
              '&password=' + userdata.password,
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
  $scope.login = function(userdata){
    $http({
      method: 'POST',
      url: 'http://staging.wine-enterprise.com:8011/apis/user/login',
      data: 'username=' + userdata.username + '&password=' + userdata.password,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      responseType :'json',
    }).then(function(response) {
        localStorage.setItem('loginInfo',JSON.stringify(response.data));

        $state.go('app.home', {}, {reload: true});

        console.log(JSON.parse(localStorage.getItem('loginInfo')));
      })
      // }, function(err){
      //     console.error('ERR', err);
      // })
  }
  $scope.loginInfo = [];
  $scope.loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
  console.log('testing',$scope.loginInfo);

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
