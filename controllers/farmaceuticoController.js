(function(){

	angular.
	module('farmaceutico',['ui.router']).	
	controller("farmaceuticoCtlr", function ($scope, $rootScope) {			
		$scope.pagina= "farmaceutico";
	}).
	config(function($stateProvider) {
  		$stateProvider.state('farmaceutico', {
  			url:'/farmaceutico',
    		templateUrl: 'views/farmaceutico/homeFarmaceutico.html',
    		controller: 'farmaceuticoCtlr'
  		});

	});
})
();