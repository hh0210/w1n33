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
		console.log('current USER ID',user_id);
	}else{
		var user_id = '0';
		console.log('current USER ID',user_id);
	}

    //GET SALES ORDER ITEM
    $http.get('http://staging.wine-enterprise.com:8011/apis/sales/order?cart_id='+cart_id+'&user_id='+user_id)
      .then(function(response) {
        $scope.salesorderList = response.data;

        console.log('INFO',response.data);


        $scope.total_price = $scope.salesorderList[0].total_price;
        $scope.img = "http://shared.wine-enterprise.com/upload/product/";
        // This is total price of all product, without shipping fee.
        $scope.subtotal = $scope.salesorderList[0].total_price;

        console.log(response);
        if($scope.salesorderList[0].shipment_type == null){
        	$scope.shipment_method = 'Self Pickup';
        	$scope.location_name = $scope.salesorderList[0].location_name;
        	$scope.address = $scope.salesorderList[0].address;
        }else{
			$scope.shipment_method = 'Shipping';
			$scope.type = $scope.salesorderList[0].shipment_type+': MYR '+parseInt($scope.salesorderList[0].shipment_price).toFixed(2);
			$scope.total_price = parseInt($scope.salesorderList[0].total_price) + parseInt($scope.salesorderList[0].shipment_price);
        };
      }, function(err){
          console.error('ERR', err);
      });

    //billing info
    $http.get('http://staging.wine-enterprise.com:8011/apis/sales/order/person?cart_id='+cart_id)
      .then(function(response) {

      	console.log('EMAIL', response.data.email);
      	localStorage.setItem('email',JSON.stringify(response.data.email));
      	$scope.email = JSON.parse(localStorage.getItem('email'));
      	// console.log("############### inside one", $scope.email);
      }, function(err){
          console.error('ERR', err);
      })

    //Create invoice
    $scope.email = JSON.parse(localStorage.getItem('email'));
    // console.log(JSON.parse(localStorage.getItem('email')));
    // console.log("############## scope email111 outside1");
    // console.log($scope.email);
    // console.log("############## scope email222 outside2");


	$scope.invoice = function(salesorderList){
		$http({
		    method: 'POST',
		    url: 'http://staging.wine-enterprise.com:8011/apis/invoice',
		    data: 'cart_id=' + cart_id + '&user_id=' + user_id + '&email=' + $scope.email,
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    responseType :'json',
		}).then(function successCallback(response) {
			console.log('INFO', response);
			//console.log('STATUS', response.data.status);
			//console.log('invoice_id', response.data.invoice_id);

			// localStorage.removeItem('cart_id');
			localStorage.removeItem('cart_id');
			
			$state.go('app.payment');
		//})
		}, function errorCallback(response) {
			console.log('ERROR', response);

		});
	}

});
