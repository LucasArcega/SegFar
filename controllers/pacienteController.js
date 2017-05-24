(function(){

	angular.
	module('paciente',['ui.router']).
	
	controller("pacienteCtlr", function ($scope, $rootScope) {
			
		$scope.pagina= "Paciente";		
				
	}).
	config(function($stateProvider) {
  		$stateProvider. 			

  			state('paciente', {
	  			url: '/paciente',
	    		templateUrl: 'views/paciente/homePaciente.html',
	    		controller: 'pacienteCtlr'
	  		});

	});
})
();