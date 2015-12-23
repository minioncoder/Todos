'use strict';

angular.module('todosApp')
  .controller('LogoutCtrl', function (authToken, $state){
        authToken.removeToken();
        $state.go('main');
  });
