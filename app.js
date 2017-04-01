(function () {

	var app = angular.module("segFar", ['ui.router','ngAnimate',
							 'ui.materialize','farmaceutico','paciente','navbar']);

	app.config(function($stateProvider,$urlRouterProvider) {

		$urlRouterProvider.otherwise('/home');

 		$stateProvider.
 			state("home",{
 				url:"/home",
 				templateUrl:"views/home.html"
 			});
	});

})();