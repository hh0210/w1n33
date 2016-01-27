angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, $http, $ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  // $scope.loginData = {
  //   'src': 'img/ionic.png'
  // };

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
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };


  //Localstorage LoginInfo for if app closed
  if (localStorage.getItem('loginInfo') != null) {
    $scope.loginInfo = [];
    $scope.loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
    console.log('INFO',$scope.loginInfo);

    $scope.noUser = false;
    $scope.haveUser = true;
  }else{
    $scope.noUser = true;
    $scope.haveUser = false;
  };

  //logout
  $scope.logout = function() {
    localStorage.clear('loginInfo');
    console.log('INFO',JSON.parse(localStorage.getItem('loginInfo')));
    $scope.noUser = true;
    $scope.haveUser = false;
    if(localStorage.getItem('cart_id') != null){
      localStorage.clear('cart_id');
    };

    //force font-end hidden username gone by printing it out
    $scope.loginInfo = [];
    $scope.loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
    // console.log($scope.loginInfo.username); //will block state.go

    // Popup message for logout sucessfully.
     var alertPopup = $ionicPopup.alert({
        title: 'Message',
        template: 'You have successfully logout!'
     });
     alertPopup.then(function(res) {
         
     });

     // Close the popup message and go to home page.
     $timeout(function(){
        alertPopup.close();
     }, 1000);
     $state.go('app.home');
  };

  //LOGIN
  $scope.loginUser = function(userdata){
    localStorage.clear('cart_id');
    $http({
      method: 'POST',
      url: 'http://staging.wine-enterprise.com:8011/apis/user/login',
      data: 'username=' + userdata.username + '&password=' + userdata.password,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      responseType :'json',
    }).then(function(response) {
      
        if(response.data != false){

          localStorage.setItem('loginInfo',JSON.stringify(response.data));
          console.log('login info: ',JSON.parse(localStorage.getItem('loginInfo')));
          //test
          $scope.noUser = false;
          $scope.haveUser = true;
          $scope.loginInfo = [];
          $scope.loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
          console.log('username',$scope.loginInfo.username);

           // Popup message for login sucessfully.
           var alertPopup = $ionicPopup.alert({
              title: 'Message',
              template: 'You have successfully login!'
           });
           alertPopup.then(function(res) {
               
           });

           //Close the popup message, modal and go to home page.
            $timeout(function() {
              alertPopup.close();
            }, 1500);

            $scope.closeLogin();
            $state.go('app.home');

        }else{
          // Popup message for fail to login.
           var alertPopup = $ionicPopup.alert({
              title: 'Message',
              template: 'Username or password is invalid!'
           });
           alertPopup.then(function(res) {

           });
           $timeout(function() {
              alertPopup.close();
            }, 2000);
           return;
        };
      }, function(err){
          console.error('ERR', err);
      })
  };

  //force get cart id
  $scope.getCartId = function(){
    if(JSON.parse(localStorage.getItem('cart_id')) != null){
      $scope.cart_id = JSON.parse(localStorage.getItem('cart_id'));
      console.log('current cart_id',$scope.cart_id);

      //get cart count
      $http.get('http://staging.wine-enterprise.com:8011/apis/cart/list?cart_id='+$scope.cart_id+'&user_id='+user_id)
        .then(function(response) {
          $scope.cartList = response.data;
          console.log(response);
        }, function(err){
            console.error('ERR', err);
        })
    }else{
      $scope.cart_id = '';
      console.log('current cart_id',$scope.cart_id);
    };
  };
  
  $scope.loginInfo = [];
  $scope.loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
  console.log('INFO',$scope.loginInfo);

  // cart id
  var cart_id = (localStorage.getItem('cart_id'))?JSON.parse(localStorage.getItem('cart_id')):'';
  console.log('cart_id',cart_id);

  // user id
  var user_id = (localStorage.getItem('loginInfo'))?JSON.parse(localStorage.getItem('loginInfo')).id:'0';
  console.log('user_id',user_id);

  //GET CART ITEM
   $http.get('http://staging.wine-enterprise.com:8011/apis/cart/list?cart_id='+$scope.cart_id+'&user_id='+user_id)
    .then(function(response) {
      $scope.cartList = response.data;
      console.log(response);
    }, function(err){
        console.error('ERR', err);
    })

})
  

//PRODUCTS
.controller("ProductController", function($scope, $http) {
 
    $scope.images = [];
 
    $scope.loadImages = function() {
        for(var i = 0; i < 100; i++) {
            $scope.images.push({id: i, src: "http://placehold.it/50x50"});
        }
    }

  $http.get('http://echo.jsontest.com/conditions/frightful').then(function(resp) {
    $scope.conditions = resp.data.conditions;
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
 
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('SearchController', function($scope){
    $scope.details = [
      {'name':'Nexus S',
       'snippet':'Fast just got faster with Nexus S.',
       'age':'1'},
      {'name': 'Motorola XOOM™ with Wi-Fi',
      'snippet': 'The Next, Next Generation tablet.',
       'age':'2'},
      {'name': 'MOTOROLA XOOM™',
       'snippet': 'LOL, Next Generation tablet.',
       'age':'3'}
    ];

     // $scope.orderProp = 'age';
});
