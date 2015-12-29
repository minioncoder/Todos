angular.module('todosApp').config(function($urlRouterProvider, $stateProvider, $httpProvider){

    $urlRouterProvider.otherwise('/'),
    
        $stateProvider
    
    .state('main', {
        url: '/',
        templateUrl: '/views/main.html'
    })
    
    .state('register', {
        url: '/register',
        templateUrl: '/views/register.html',
        controller: 'RegisterCtrl'
    })
    
    .state('login', {
        url: '/login',
        templateUrl: '/views/login.html',
        controller: 'LoginCtrl'
    })
    
    .state('job', {
        url: '/job',
        templateUrl: '/views/job.html',
        controller: 'JobsCtrl'
    })
    .state('completed', {
        url: '/completed',
        templateUrl: '/views/completed.html',
        controller: 'CompletedCtrl'
    })
     .state('logout', {
        url: '/logout',
        controller: 'LogoutCtrl'
    });
    $httpProvider.interceptors.push('authInterceptor');
})
.constant('API_URL', 'http://localhost:3000/');