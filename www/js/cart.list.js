angular.module('starter.cartlist', [])

//CART LIST
.controller("cartlist", function($scope, $http, $stateParams, $state) {

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
     $http.get('http://staging.wine-enterprise.com:8011/apis/cart/list?cart_id='+$stateParams.cart_id+'&user_id='+user_id)
      .then(function(response) {
        // if(response.data[0].product_id == null){
        // 	$state.go('app.categories');
        // };
        $scope.cartList = response.data;
        $scope.img = "http://shared.wine-enterprise.com/upload/product/";
        console.log(response);
      }, function(err){
          console.error('ERR', err);
      })

	//Delete Cart ITEM
	$scope.delete = function(cartInfo){
		$http({
		    method: 'POST',
		    url: 'http://staging.wine-enterprise.com:8011/apis/cart/list/delete',
		    data: 'cart_id='+$stateParams.cart_id + '&id_ProductMaster=' +cartInfo.product_id,
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    responseType :'json',
		}).then(function successCallback(response) {
			console.log('INFO', response);
			console.log('INFO', response.data.status);
			$state.go('app.cartlist', {}, {reload: true});
		}, function errorCallback(response) {
			console.log('ERROR', response);

		});
	}

    //Create Sales Order
	$scope.salesorder = function(cartList){
		$http({
		    method: 'POST',
		    url: 'http://staging.wine-enterprise.com:8011/apis/sales/order',
		    data: 'cart_id='+$stateParams.cart_id,
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    responseType :'json',
		}).then(function successCallback(response) {
			console.log('INFO', response);
			console.log('INFO', response.data.status);
			console.log('INFO', response.data.salesorder_id);
			$state.go('app.billing');
		//})
		}, function errorCallback(response) {
			console.log('ERROR', response);

		});
	}

});
