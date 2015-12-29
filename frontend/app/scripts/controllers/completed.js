'use strict';

angular.module('todosApp')
  .controller('CompletedCtrl', function ($scope) {
    $scope.completedThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
