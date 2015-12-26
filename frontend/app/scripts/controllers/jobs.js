'use strict';

angular.module('todosApp')
  .controller('JobsCtrl', function ($scope, $http, API_URL, alert, $location) {
    $scope.tasks = [];
    
    $scope.addtodo = function(){
        var task = {text: $scope.task, Completed: false};
        $scope.tasks.push(task);
        $scope.task = null;
        $http.post(API_URL + 'jobs', task).then(function(res){
            console.log(res);
        });
    }
    
    $scope.removeItem = function(index){
        $scope.tasks.splice(index, 1);
    }
    
    $scope.done = function(task){
        //console.log('task = ', task.text, task.Completed);
        var t = $scope.tasks.indexOf(task);
        $scope.tasks[t].Completed = true;
    }
   
    $http.get(API_URL + 'jobs').success(function(tasks){
        $scope.tasks = tasks;
    }).error(function(err){
        alert('warning', "Unable to get jobs", err.message);
    });  
    
  });
