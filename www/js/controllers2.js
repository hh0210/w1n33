angular.module('starter.controllers2', [])

.controller('HomeController', function($scope, $ionicSlideBoxDelegate, $ionicGesture) {
  
  	// Enable the manual slide.
  	$ionicSlideBoxDelegate.enableSlide(true);

  	$scope.img = [{
    	src: 'img/wine1.jpg'
   	}, 
   	{
   		src: 'img/wine2.jpg'
   	},
   	{
   		src: 'img/wine3.jpg'
   	}];
   	
});