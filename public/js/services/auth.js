var myApp = angular.module('auth-token');

myApp.factory('Authentication',['$rootScope','$http', '$window',function($rootScope, $http, $window){
	var auth = {};
	var url = 'http://localhost:3000';
	var user;

	auth.login = function(credentials){
		return $http.post(url+'/login', credentials)
			.then(function(response){
				$window.localStorage.setItem('token',JSON.stringify(response.data.token));
				return response
			})
	};
	auth.registro = function(credentials){
		return $http.post(url+'/registrate', credentials)
			.then(function(response){
				$window.localStorage.setItem('token',JSON.stringify(response.data.token));
				return response
			})
	}
	auth.getUser = function(){
		var token = $window.localStorage.getItem('token');
		var user = {};
		if (typeof token !== undefined){
			var encoded = token.split('.')[1];
			user = JSON.parse(urlBase64Decode(encoded));
		}
		return user;
	};

	auth.logout = function(){
		delete $window.localStorage.token;
		console.log($window.localStorage.getItem('token'));
	};

	auth.isAuthenticated = function(){
		return ($window.localStorage.getItem('token') !== null);
	};

	auth.getToken = function(){
		return $window.localStorage.getItem('token');
	};

  function urlBase64Decode(str) {
      var output = str.replace('-', '+').replace('_', '/');
      switch (output.length % 4) {
          case 0:
              break;
          case 2:
              output += '==';
              break;
          case 3:
              output += '=';
              break;
          default:
              throw 'Illegal base64url string!';
      }
      return window.atob(output);
  }


	return auth;
}]);
