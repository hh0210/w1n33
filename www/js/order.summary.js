angular.module('starter.ordersummary', [])

//ORDER SUMMARY
.controller("ordersummary", function($scope, $http, $state) {

	//cart id
	if(localStorage.getItem('cart_id') != null){
		var cart_id = JSON.parse(localStorage.getItem('cart_id'));
		console.log('current cart_id',cart_id);
	}else{
		var cart_id = '';
		console.log('current cart_id',cart_id);
	};

	//user id
	if(localStorage.getItem('loginInfo') != null){
		$scope.user = JSON.parse(localStorage.getItem('loginInfo'));
		var user_id = $scope.user.id;
		console.log('localstorage USER ID',user_id);
	}else{
		var user_id = '0';
		console.log('localstorage USER ID',user_id);
	}

    //GET CART ITEM
     $http.get('http://staging.wine-enterprise.com:8011/apis/cart/list?cart_id='+cart_id+'&user_id='+user_id)
      .then(function(response) {
        $scope.cartList = response.data;
        $scope.img = "http://shared.wine-enterprise.com/upload/product/";
        console.log(response);
      }, function(err){
          console.error('ERR', err);
      })

    //Create Sales Order
	$scope.salesorder = function(cartList){
		$http({
		    method: 'POST',
		    url: 'http://staging.wine-enterprise.com:8011/apis/sales/order',
		    data: 'cart_id='+cart_id,
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    responseType :'json',
		}).then(function successCallback(response) {
			console.log('INFO', response);
			console.log('INFO', response.data.status);
			console.log('INFO', response.data.salesorder_id);
			$state.go('app.billing');
		})
		// }, function errorCallback(response) {
		// 	console.log('ERROR', response);

		// });
	}

});
