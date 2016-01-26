angular.module('starter.payment', [])

//PAYMENT
.controller("payment", function($scope, $ionicPopup, $state) {
 

  localStorage.removeItem('cart_id'); //remove session
  var cart_id = (localStorage.getItem('cart_id'))?JSON.parse(localStorage.getItem('cart_id')):'';
  console.log('cart_id',cart_id);
 //  $scope.showPopup = function() {

 //   var alertPopup = $ionicPopup.alert({
 //     title: 'Thanks for your order!',
 //     template: 'Your transaction ID is :45GF480X. You will received a confirmation email soon.'
 //   });
 //   alertPopup.then(function(res) {
   		
 //   		// Pass in state parameter that defined in app, then can go to different state.
 //   		$state.go('app.home');
 //   });
 // };
 
});