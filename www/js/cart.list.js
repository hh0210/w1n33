angular.module('starter.cartlist', [])

//CART LIST
.controller("cartlist", function($scope, $http, $stateParams) {

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
        $scope.cartList = response.data;
        $scope.img = "http://shared.wine-enterprise.com/upload/product/";
        console.log(response);
      }, function(err){
          console.error('ERR', err);
      })
});
