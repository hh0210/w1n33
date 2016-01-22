angular.module('starter.user', ['ngMessages'])

//REGISTRATION
.controller("user", function($scope, $http, $ionicPopup, $state, $timeout) {

	//SIGN UP
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
      
       // Popup message for logout sucessfully.
       var alertPopup = $ionicPopup.alert({
          title: 'Message',
          template: 'You have successfully register!'
       });
       alertPopup.then(function(res) {
           
       });

       // Close the popup message and modal and go to home page.
       $timeout(function(){
          alertPopup.close();
       }, 1000);

       $scope.closeLogin();
       $state.go('app.home');

		}, function errorCallback(response) {
			console.log('ERROR', response);
		});
	};
  
//login in controller.js

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

  //profile

  // login user info
  if (localStorage.getItem('loginInfo') != null) {
    $scope.user = JSON.parse(localStorage.getItem('loginInfo'));
    var user_id = $scope.user.id;
    console.log('localstorage USER ID',user_id);
  }

  $http.get('http://staging.wine-enterprise.com:8011/apis/user/profile?user_id='+user_id)
    .then(function(response) {
        $scope.userdata = response.data;
        console.log($scope.userdata);
      }, function(err){
          console.error('ERR', err);
  })

  $scope.profileform = function(userdata){
    $http({
        method: 'POST',
        url: 'http://staging.wine-enterprise.com:8011/apis/user/profile',
        data: 'user_id=' + userdata.id_UserMaster + '&given_name=' + userdata.given_name + '&family_name=' + userdata.family_name +
              '&email=' + userdata.email + '&phone=' + userdata.phone +
              '&address1=' + userdata.address1 + '&address2=' + userdata.address2 +
              '&postcode=' + userdata.postcode + '&city=' + userdata.city,
        // data: {"username=":'username1','password=':'passwod1'},
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        // headers: {'Content-Type': 'application/json'}
        responseType :'json',
    }).then(function successCallback(response) {
      console.log('INFO', response);
      // console.log('INFO', response.data.status);
      
       // Popup message for logout sucessfully.
       var alertPopup = $ionicPopup.alert({
          title: 'Message',
          template: 'You have successfully save!'
       });
       alertPopup.then(function(res) {
           
       });

       // Close the popup message and modal and go to home page.
       $timeout(function(){
          alertPopup.close();
       }, 1000);

       $scope.closeLogin();
       $state.go('app.user-profile');

    }, function errorCallback(response) {
      console.log('ERROR', response);
    });
  };

});
