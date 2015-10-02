// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var appStarter = angular.module('starter', ['ionic', 'starter.controllers', 'starter.controllers2','starter.categories',
                                            'starter.productdetails','starter.productlist','starter.cartlist',
                                            'starter.ordersummary', 'starter.user', 'starter.payment', 'starter.guest'])

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

  .state('app.home', {
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
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'SearchController'
      }
    }
  })

  .state('app.categories', {
    url: '/categories',
    views: {
      'menuContent': {
        templateUrl: 'templates/categories.html',
        controller: 'categories'
      }
    }
  })

  .state('app.user', {
      url: '/register',
      views: {
        'menuContent': {
          templateUrl: 'templates/register.html',
          controller: 'user'
        }
      }
    })

  .state('app.user', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          controller: 'user'
        }
      }
    })

  .state('app.user', {
      url: '/forgotpassword',
      views: {
        'menuContent': {
          templateUrl: 'templates/forgotpassword.html',
          controller: 'user'
        }
      }
    })

  .state('app.orderhistory', {
      url: '/order/history',
      views: {
        'menuContent': {
          templateUrl: 'templates/order.history.html'
        }
      }
    })

  // .state('app.promotion', {
  //     url: '/promotion',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/promotion.html'
  //       }
  //     }
  //   })

    .state('app.products', {
      url: '/products',
      views: {
        'menuContent': {
          templateUrl: 'templates/products.html',
          controller: 'ProductController'
        }
      }
    })


    .state('app.productlist', {
      url: '/product/list',
      views: {
        'menuContent': {
          templateUrl: 'templates/product.list.html',
          controller: 'productlist'
        }
      }
    })


    .state('app.productdetails', {
      url: '/product/details',
      views: {
        'menuContent': {
          templateUrl: 'templates/product.details.html',
          controller: 'productdetails'
        }
      }
    })

    .state('app.cartlist', {
      url: '/cart/list',
      views: {
        'menuContent': {
          templateUrl: 'templates/cart.list.html',
          controller: 'cartlist'
        }
      }
    })

    .state('app.ordersummary', {
      url: '/order/summary',
      views: {
        'menuContent': {
          templateUrl: 'templates/order.summary.html',
          controller: 'ordersummary'
        }
      }
    })

    .state('app.guest', {
      url: '/guest',
      views: {
        'menuContent': {
          templateUrl: 'templates/guest.html',
          controller: 'guest'
        }
      }
    })

    .state('app.payment', {
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
