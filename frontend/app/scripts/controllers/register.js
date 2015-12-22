'use strict';

angular.module('todosApp')
  .controller('RegisterCtrl', function ($scope, $http, $rootScope, alert, authToken) {
        $scope.submit = function(){
            var url = 'http://localhost:3000/register';
            var user = {
                email: $scope.email,
                password: $scope.password
            };
            $http.post(url, user)
                .success(function(res){
                    alert('success', 'Ok! ', 'You are now registered');
                    authToken.setToken(res.token);
                })
                .error(function(err){
                    alert('warning', 'OOPS!', ' Could not register');
                })
        }
});
