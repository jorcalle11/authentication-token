var myApp = angular.module('auth-token',['ui.router', 'ngMessages']);

myApp.config(['$stateProvider','$urlRouterProvider',function ($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home',{
			url:'/',
			templateUrl:'/views/home.html'
		})
		.state('login',{
			url:'/login',
			templateUrl:'/views/login.html',
			controller:'AuthCtrl'
		})
		.state('perfil',{
			url:'/perfil',
			templateUrl:'/views/perfil.html',
			controller: 'PerfilCtrl'
		})
		.state('registrate',{
			url:'/registrate',
			templateUrl:'/views/registro.html',
			controller: 'AuthCtrl'
		});
}]);

myApp.run(['$rootScope', '$state','Authentication',function($rootScope, $state, Authentication){
	if(Authentication.getToken()){
		$rootScope.currentUser = Authentication.getUser();
	}
}])


