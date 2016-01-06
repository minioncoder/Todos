'use strict';

angular.module('todosApp')
  .controller('CompletedCtrl', function ($scope, $http, API_URL, alert, $location) {
    $scope.completedThings = [];
    
    $http.get(API_URL + 'completed').success(function(tasks){
            $scope.tasks = tasks;
    }).error(function(err){
        alert('warning', "Unable to get jobs", err.message);
    });  
  });
