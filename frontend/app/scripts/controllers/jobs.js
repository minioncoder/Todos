'use strict';

angular.module('todosApp')
  .controller('JobsCtrl', function ($scope, $http, API_URL, alert, $location) {
    $scope.tasks = [];
    
    $scope.addtodo = function(){
        var task = {text: $scope.task, Completed: false};
        $scope.tasks.push(task);
        $scope.task = null;
        $http.post(API_URL + 'jobs', task).then(function(res){
            //console.log(res);
        });
    }
    
    $scope.removeItem = function(index){
        var ind = $scope.tasks.splice(index, 1);
        var url = API_URL + 'jobs/'+ind[0]._id;
        $http.delete(url).then(function(res){
            console.log("Deleted task", res);
        });
    }
    
    $scope.done = function(index){
        var t = $scope.tasks.indexOf(index);
        var t1 = $scope.tasks[t];
        t1.Completed = true;
        var url = API_URL + 'jobs/' + t1._id;
        $http.put(url, t1)
        .success(function(data, status, headers){
            t1.Completed = true;
            $scope.ServerResponse = data;
            console.log(data);
        });
    }
   
    $http.get(API_URL + 'jobs').success(function(tasks){
            $scope.tasks = tasks;
    }).error(function(err){
        alert('warning', "Unable to get jobs", err.message);
    });  
    
  });
