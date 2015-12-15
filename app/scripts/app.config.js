angular.module('todosApp').config(function($stateProvider){

    $stateProvider.state('register', {
        url: '/register',
        templateUrl: '/views/register.html'
    });
});