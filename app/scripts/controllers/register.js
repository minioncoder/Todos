'use strict';

angular.module('todosApp')
  .controller('RegisterCtrl', function ($scope, $http, $rootScope, alert) {
        $scope.submit = function(){
            var url = '/';
            var user = {};
            $http.post(url, user)
                .success(function(res){
                    alert('success', 'Ok', 'You are now registered')
                })
                .error(function(err){
                    alert('warning', 'OOPS!', ' Could not register');
                })
        }
});
