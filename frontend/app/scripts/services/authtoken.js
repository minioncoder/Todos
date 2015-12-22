'use strict';


angular.module('todosApp').factory('authToken', function($window) {
    var storage = $window.localstorage;
    var cachedToken; 
    return {
        setToken: function(token){
           cachedToken = token;
            storage.setItem('userToken', token);
        },
        getToken: function(){
            if(!cachedToken)
                cachedToken = storage.getItem('userToken');
            
            return cachedToken;
        },
        isAuthenticated: function(){
            return !!this.getToken();
        }
      }
    });
