angular.module('starter.ordersummary', [])

//ORDER SUMMARY
.controller("ordersummary", function($scope, $http, $state) {

    //GET CART ITEM
     $http.get('http://staging.wine-enterprise.com:8011/apis/cart/list')
      .then(function(response) {
        $scope.cartList = response.data;
        $scope.img = "http://shared.wine-enterprise.com/upload/product/";
        console.log(response);
      }, function(err){
          console.error('ERR', err);
      })

    //Add Sales Order
	$scope.salesorder = function(cartList){
		$http({
		    method: 'POST',
		    url: 'http://staging.wine-enterprise.com:8011/apis/sales/order',
		    data: 'cart_id=1',
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    responseType :'json',
		})

		$state.go('app.billing');
		// }).then(function successCallback(response) {
		// 	console.log('INFO', response);
		// 	console.log('INFO', response.data.status);
	 //        $scope.test = response.data;
		// }, function errorCallback(response) {
		// 	console.log('ERROR', response);

		// });
	}

});
