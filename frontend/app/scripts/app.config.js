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
    .state('job', {
        url: '/job',
        templateUrl: '/views/job.html',
        controller: 'JobsCtrl'
    })
     .state('logout', {
        url: '/logout',
        controller: 'LogoutCtrl'
    });
    $httpProvider.interceptors.push('authInterceptor');
})
.constant('API_URL', 'http://localhost:3000/');