angular.module('starter.categories', [])

//CATEGORIES
.controller("categories", function($scope, $http) {
 
    $scope.images = [];
 
    $scope.loadImages = function() {
        for(var i = 0; i < 8; i++) {
            $scope.images.push({id: i, src: "http://placehold.it/50x50"});
        }
    }

});
