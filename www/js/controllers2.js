angular.module('starter.controllers2', [])

.controller('HomeController', function($scope, $ionicSlideBoxDelegate) {
  
	$scope.nextSlide = function() {
		$ionicSlideBoxDelegate.enableSlide(true);

    	$ionicSlideBoxDelegate.next();
  	};	

   $scope.img = [{
    src: 'img/ionic.png'
   }];

   // $scope.enableSlide = function() {
   // 		$ionicSlideBoxDelegate.enableSlide(true);
   // 		console.log("done");
   // }
   console.log("run controller already");
});

