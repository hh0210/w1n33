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

   	// $scope.onSwipeRight = function(index) {
   	// 	$ionicSlideBoxDelegate.slide(index, 1000);
   	// }

	// $scope.nextSlide = function() {
 //      $ionicSlideBoxDelegate.next();
 //  	};	

 //  	$scope.slideChanged = function(index) {
 //        $scope.slideIndex = index;
 //     };

	// $scope.swipeRight = function() {
	// 	$scope.indicator='turned right';
	// 	console.log("swipe to right");
	// };

	// $scope.swipeLeft = function() {
	// 	$scope.indicator='turned left';
	// 	console.log("swipe to left");
	// };
	// $scope.next = function() {
	//     $ionicSlideBoxDelegate.next();
	//     console.log("delegate next");
	// };
	// $scope.previous = function() {
	//     $ionicSlideBoxDelegate.previous();
	//     console.log("delegate previous");
	// };

});