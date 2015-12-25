'use strict';

angular.module('todosApp')
  .controller('JobsCtrl', function ($scope, $http, API_URL, alert) {
    $scope.tasks = [];
    $scope.addtodo = function(){
        $scope.tasks.push({text: $scope.task, done: false});
        $scope.task = null;
    }
    $scope.removeItem = function(index){
        $scope.tasks.splice(index, 1);
    }
    
    $scope.done = function(task){
        console.log('task = ', task.text, task.done);
        var t = $scope.tasks.indexOf(task);
        $scope.tasks[t].done = true;
    }
   
    $http.get(API_URL + 'jobs').success(function(tasks){
        $scope.tasks = tasks;
    }).error(function(err){
        alert('warning', "Unable to get jobs", err.message);
    });  
  });
