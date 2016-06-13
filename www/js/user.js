angular.module('starter.user', ['ngMessages'])

//REGISTRATION
.controller("user", function($scope, $http, $ionicPopup, $state, $timeout) {


  //temp
  var apis = 'http://apis.wine-enterprise.com';

	//SIGN UP
  // $scope.signup = function(register){
  // 	$http({
  // 	    method: 'POST',
  // 	    url: apis+'/apis/user/registration',
  // 	    // data: 'username=' + register.username + '&email=' + register.email +
  //       data: 'email=' + register.email +
  //             '&password=' + register.password,
  // 	    // data: {"username=":'username1','password=':'passwod1'},
  // 	    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  // 	    // headers: {'Content-Type': 'application/json'}
  // 	    responseType :'json',
  // 	}).then(function successCallback(response) {
  // 		console.log('status', response.data.status);
        
  //       if(response.data.status == true){
  //        // Popup message for logout sucessfully.
  //        var alertPopup = $ionicPopup.alert({
  //           title: 'Message',
  //           template: 'You have successfully register!'
  //        });
  //        alertPopup.then(function(res) {});

  //        // Close the popup message and modal and go to home page.
  //        $timeout(function(){
  //           alertPopup.close();
  //        }, 1000);

  //        $scope.closeLogin();
  //        $state.go('app.home', {}, {reload:true});
  //       }else{
  //         var alertPopup = $ionicPopup.alert({
  //           title: 'Message',
  //           template: 'This email has already been used.'
  //          });
  //          alertPopup.then(function(res) {});

  //          // Close the popup message and modal and go to home page.
  //          $timeout(function(){
  //             alertPopup.close();
  //          }, 1000);
  //       }

  // 	}, function errorCallback(response) {
  // 		console.log('ERROR', response);
  // 	});
  // };
  
//register and login in controller.js

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
    console.log('user_id',user_id);
  }

  $http.get(apis+'/apis/user/profile?user_id='+user_id)
    .then(function(response) {
        $scope.userdata = response.data;
        $scope.userdata.referral_code = ($scope.userdata.referral_code != 'undefined' || '')?$scope.userdata.referral_code:'';
        $scope.promotion($scope.userdata.referral_code);
        console.log($scope.userdata);
      }, function(err){
          console.error('ERR', err);
  });

  //reuse pop up
  var alert = function(title, message, timeout){
    var popup = $ionicPopup.alert({ title: title, template: message, });
    popup;
    timeout = timeout * 1000;
    $timeout(function(){ popup.close(); }, timeout);
  };

  $scope.promotion = function(promo_code){
    if(promo_code) $scope.referral_code = false; 
    $http.get(apis+'/apis/verify/promotion?promo_code='+promo_code)
      .then(function(response) {
            $scope.details = response.data;
            if($scope.details.code || promo_code == '') $scope.referral_code = true; 
        }, function(err){
          console.error('ERR', err);
    });
  };

  $scope.ProfileForm = function(userdata){
    $http({
        method: 'POST',
        url: apis+'/apis/user/profile',
        data: 'user_id=' + userdata.id_UserMaster + '&promo_code=' + userdata.referral_code + '&given_name=' + userdata.given_name + 
              '&family_name=' + userdata.family_name + '&email=' + userdata.email + '&phone=' + userdata.phone +
              '&address1=' + userdata.address1 + '&address2=' + userdata.address2 +
              '&postcode=' + userdata.postcode + '&city=' + userdata.city,
        // data: {"username=":'username1','password=':'passwod1'},
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        // headers: {'Content-Type': 'application/json'}
        responseType :'json',
    }).then(function successCallback(response) {
      console.log('INFO', response);
      // console.log('INFO', response.data.status);
      
       var alertPopup = $ionicPopup.alert({
          title: 'Message',
          template: 'You have successfully save!',
       });

       alertPopup.then(function(res) {
           
       });

       // Close the popup message and modal and go to home page.
       $timeout(function(){
          alertPopup.close();
       }, 1000);

       $scope.closeLogin();
       // $state.go('app.user-profile');
       $state.go($state.current);
       // localStorage.setItem('loginInfo',JSON.stringify(response.data));

    }, function errorCallback(response) {
      console.log('ERROR', response);
    });
  };

});
