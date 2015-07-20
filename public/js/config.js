var myApp = angular.module('auth-token');

myApp.config(['$httpProvider',
	function($httpProvider){
		$httpProvider.interceptors.push(['$rootScope','$q', '$window','Auth_Events' ,function($rootScope,$q, $window, Auth_Events) {
			return {
				request: function(config){
					config.headers = config.headers || {};
					if ($window.localStorage.token){
						config.headers.Authorization = 'Bearer '+JSON.parse($window.localStorage.token);
					}
					return config;
				},
			  responseError: function(response) {
					switch (response.status) {
						case 401:
							// Deauthenticate the global user
							$rootScope.$broadcast(Auth_Events.notAuthenticated);
							console.log('no estas logueado');

							// Redirect to signin page
							$location.path('signin');
							break;
						case 403:
							// Add unauthorized behaviour
							$rootScope.$broadcast(Auth_Events.notAuthenticated);
							console.log('no estas autorizado');
							break;
					}
			    return $q.reject(response);
			  }
			};
		}]);
	}
]);
