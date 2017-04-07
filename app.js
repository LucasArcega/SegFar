(function () {

	var app = angular.module("segFar", ['ui.router','ngAnimate',
							 'ui.materialize','farmaceutico','paciente','navbar']);

	app.config(function($stateProvider,$urlRouterProvider) {

		$urlRouterProvider.otherwise('/farmaceutico');

 		$stateProvider.
 			state("home",{
 				url:"/login",
 				templateUrl:"views/login.html"
 			});
	});

})();