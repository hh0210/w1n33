angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, $http, $ionicPopup) {

  //temp
  var apis = 'http://apis.wine-enterprise.com';

  //logo
  $scope.TitleImg='<img class="img-small ml20" src="img/logo/logo.png" />';

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
    $scope.userdata = { username: '', password: '' };
    $scope.register = { email: '', password: '', confpassword: ''};
  };

  //logout
  $scope.logout = function() {

    localStorage.removeItem('loginInfo');
    localStorage.removeItem('cart_id');
    $scope.userinfo = '';
    // $scope.cartList = '';

    console.log('session',localStorage.getItem('loginInfo'), localStorage.getItem('cart_id'));

    // Popup message for logout sucessfully.
    var alertPopup = $ionicPopup.alert({
      title: 'Message',
      template: 'You have successfully logout!'
    });
    alertPopup.then(function(res) {});

    // Close the popup message and go to home page.
    $timeout(function(){
      alertPopup.close();
    }, 1000);
    //$state.go('app.home',{},{reload:true});
  };

  //LOGIN
  $scope.loginUser = function(userdata){
    localStorage.removeItem('cart_id');
    $scope.cartList = '';
    $http({
      method: 'POST',
      url: apis+'/apis/user/login',
      data: 'username=' + userdata.username + '&password=' + userdata.password,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      responseType :'json',
    }).then(function(response) {

        if(response.data.MemberInfo){
          localStorage.setItem('loginInfo',JSON.stringify(response.data));
          console.log('login info: ',JSON.parse(localStorage.getItem('loginInfo')));

           // Popup message for login sucessfully.
           var alertPopup = $ionicPopup.alert({
              title: 'Message',
              template: 'You have successfully login!'
           });
           alertPopup.then(function(res) {});

           //Close the popup message, modal and go to home page.
            $timeout(function() {
              alertPopup.close();
            }, 1500);

            $scope.closeLogin();
            $state.go('app.home',{},{reload:true});
        }else{
          // Popup message for fail to login.
          var alertPopup = $ionicPopup.alert({
            title: 'Message',
            template: 'Email or password is invalid!'
          });
          alertPopup.then(function(res) {

          });
          $timeout(function() {
            alertPopup.close();
          }, 1500);
        }

      }, function(err){
          console.error('error', err);
      })
  };

  $scope.updateSideMenuInfo = function(){

    // user id
    var user_id = (localStorage.getItem('loginInfo'))?JSON.parse(localStorage.getItem('loginInfo')).id:'0';
    console.log('user_id',user_id);

    // cart id
    var cart_id = (localStorage.getItem('cart_id') != 'undefined')?JSON.parse(localStorage.getItem('cart_id')):'';
    console.log('cart_id', cart_id);
    console.log('cartList', $scope.cartList);
      
    if(cart_id){
      //get cart count
      $http.get(apis+'/apis/cart/list?cart_id='+cart_id+'&user_id='+user_id)
        .then(function(response) {
          $scope.cartList = response.data;
          console.log('cart info',response);
        }, function(err){
            console.error('error', err);
        });
    }else{
      $scope.cartList = {cart_count: 0}
    }

    if (user_id > 0) {
      $http.get(apis+'/apis/user/profile?user_id='+user_id)
        .then(function(response) {
            $scope.userinfo = response.data;
            console.log('userinfo', $scope.userinfo);
          }, function(err){
              console.error('ERR', err);
      });
    }
  };


  //register
  $scope.signup = function(register){
    $http({
        method: 'POST',
        url: apis+'/apis/user/registration',
        data: 'email=' + register.email +
              '&password=' + register.password,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        responseType :'json',
    }).then(function successCallback(response) {
      console.log('200', response);
      if(response.data.status == true){
         // Popup message for logout sucessfully.
         var alertPopup = $ionicPopup.alert({
            title: 'Message',
            template: 'You have successfully register!'
         });
         alertPopup.then(function(res) {});

         // Close the popup message and modal and go to home page.
         $timeout(function(){
            alertPopup.close();
         }, 1000);

         $scope.closeLogin();
         $state.go('app.home', {}, {reload:true});
        }else{
          var alertPopup = $ionicPopup.alert({
            title: 'Message',
            template: 'This email has already been used.'
           });
           alertPopup.then(function(res) {});

           // Close the popup message and modal and go to home page.
           $timeout(function(){
              alertPopup.close();
           }, 3000);
        }
    }, function errorCallback(response) {
      console.log('ERROR', response);
    });

  };


});