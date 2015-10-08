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

    //GET SALES ORDER ITEM
     $http.get('http://staging.wine-enterprise.com:8011/apis/sales/order?cart_id='+cart_id+'&user_id='+user_id)
      .then(function(response) {
        $scope.salesorderList = response.data;
        console.log(response);
        if($scope.salesorderList[0].shipment_type == null){
        	$scope.shipment_method = 'Self Pick Up';
        	$scope.location_name = $scope.salesorderList[0].location_name;
        	$scope.address = $scope.salesorderList[0].address;
        }else{
			$scope.shipment_method = 'Shipping';
			$scope.type = $scope.salesorderList[0].shipment_type+': RM'+$scope.salesorderList[0].price;
        };
      }, function(err){
          console.error('ERR', err);
      })

    //Create Sales Order
	$scope.invoice = function(salesorderList){
		$http({
		    method: 'POST',
		    url: 'http://staging.wine-enterprise.com:8011/apis/invoice',
		    data: 'cart_id=' + cart_id + '&user_id=' + user_id,
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    responseType :'json',
		}).then(function successCallback(response) {
			console.log('INFO', response);
			console.log('INFO', response.data.status);
			console.log('INFO', response.data.invoice_id);
			$state.go('app.payment');
		//})
		}, function errorCallback(response) {
			console.log('ERROR', response);

		});
	}

});
