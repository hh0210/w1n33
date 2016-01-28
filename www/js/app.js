// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var appStarter = angular.module('starter', ['ionic', 'starter.controllers', 'starter.controllers2','starter.categories',
                                            'starter.productdetails','starter.productlist','starter.cartlist',
                                            'starter.ordersummary', 'starter.user', 'starter.payment', 'starter.billing',
                                            'starter.shipping', 'starter.search', 'starter.orderhistory',
                                            'starter.orderhistorydetails'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.login', {
      cache: false,
      url: '/app/login',
      templateUrl: 'templates/login.html',
      controller: 'AppCtrl'
    })
      
    .state('app.home', {
      cache: false,
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeController'
        }
      }
    })

    .state('app.search', {
      url: '/search',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/search.html',
          controller: 'search'
        }
      }
    })

    .state('app.categories', {
      cache: false,
      url: '/categories',
      views: {
        'menuContent': {
          templateUrl: 'templates/categories.html',
          controller: 'categories'
        }
      }
    })

    .state('app.user.register', {
      cache: false,
      url: '/register',
      views: {
        'menuContent': {
          templateUrl: 'templates/register.html',
          controller: 'user'
        }
      }
    })

    .state('app.user-profile', {
      cache: false,
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          controller: 'user'
        }
      }
    })

    .state('app.user.forgotpassword', {
      cache: false,
      url: '/forgotpassword',
      views: {
        'menuContent': {
          templateUrl: 'templates/forgotpassword.html',
          controller: 'user'
        }
      }
    })

    .state('app.orderhistory', {
      cache: false,
      url: '/order/history',
      views: {
        'menuContent': {
          templateUrl: 'templates/order.history.html',
          controller: 'orderhistory'
        }
      }
    })

    .state('app.orderhistorydetails', {
      cache: false,
      url: '/order/history/details/:code',
      views: {
        'menuContent': {
          templateUrl: 'templates/order.history.details.html',
          controller: 'orderhistorydetails'
        }
      }
    })

    .state('app.products', {
      cache: false,
      url: '/products',
      views: {
        'menuContent': {
          templateUrl: 'templates/products.html',
          controller: 'ProductController'
        }
      }
    })


    .state('app.productlist', {
      cache: false,
      url: '/product/list/:code',
      views: {
        'menuContent': {
          templateUrl: 'templates/product.list.html',
          controller: 'productlist'
        }
      }
    })


  .state('app.productdetails', {
    cache: false,
    url: '/product/details/:sku_code',
    views: {
      'menuContent': {
        templateUrl: 'templates/product.details.html',
        controller: 'productdetails'
      }
    }
  })

  .state('app.cartlist', {
    cache: false,
    url: '/cart/list',
    views: {
      'menuContent': {
        templateUrl: 'templates/cart.list.html',
        controller: 'cartlist'
      }
    }
  })

  .state('app.ordersummary', {
    cache: false,
    url: '/order/summary',
    views: {
      'menuContent': {
        templateUrl: 'templates/order.summary.html',
        controller: 'ordersummary'
      }
    }
  })

  .state('app.billing', {
    cache: false,
    url: '/billing',
    views: {
      'menuContent': {
        templateUrl: 'templates/billing.html',
        controller: 'billing'
      }
    }
  })

  .state('app.shipping', {
    cache: false,
    url: '/shipping',
    views: {
      'menuContent': {
        templateUrl: 'templates/shipping.html',
        controller: 'shipping'
      }
    }
  })

  .state('app.payment', {
    cache: false,
    url: '/payment',
    views: {
      'menuContent': {
        templateUrl: 'templates/payment.html',
        controller: 'payment'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

});
