var myApp = angular.module('auth-token');

myApp.controller('HomeCtrl',['$rootScope','$scope','$state', 'Authentication','Auth_Events',
	function($rootScope, $scope,$state, Authentication, Auth_Events){
		$rootScope.$on(Auth_Events.notAuthenticated, function(event){
			$state.go('login');
		})

		$rootScope.setUser = function(user){
			return $rootScope.currentUser = user;
		}
		$rootScope.isAuthenticated = function(){
			return Authentication.isAuthenticated();
		};

		$scope.logout = function(){
			$rootScope.currentUser = {};
			$state.go('home');
			Authentication.logout();
		}
	}
]);

myApp.controller('AuthCtrl',['$rootScope','$scope','$timeout','Authentication','$state',
	function($rootScope, $scope, $timeout, Authentication, $state){
		$scope.login = function(){
			Authentication.login($scope.credentials)
				.then(function(response){
					$rootScope.setUser(Authentication.getUser());
					$state.go('perfil');
				},function(response){
					$scope.error = response.data.message;
					$timeout(function() {
						$scope.error = null
					}, 3000);
				});
		}

		$scope.registro = function(){
			Authentication.registro($scope.credentials)
				.then(function(response){
					$rootScope.setUser(Authentication.getUser());
					$state.go('perfil');
				},function(response){
					$scope.error = response.data.message;
					$timeout(function() {
						$scope.error = null
					}, 3000);
				});
		}
	}
]);

myApp.controller('PerfilCtrl',['$scope','$http',function($scope,$http){
	$scope.info = function(){
		$http.get('http://localhost:3000/me')
			.success(function(response){
				console.log(response)
				$scope.details = response;
			})
			.error(function(response){
				$scope.details = response;
			})
	}
}])
