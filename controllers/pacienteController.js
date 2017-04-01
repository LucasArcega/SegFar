(function(){

	angular.
	module('paciente',['ui.router']).
	
	controller("pacienteCtlr", function ($scope, $rootScope) {
			
		$scope.pagina= "Paciente";
		$scope.form = [];
		$scope.form['dadosPessoais'] = true;
		$scope.form['contato'] = true;

		$scope.formView = function(view){

			for(var viewPage in form){
				$scope.form[viewPage] = false;
			} 
			$scope.form[view] = true
		}
	}).
	config(function($stateProvider) {
  		$stateProvider.
  			state('paciente.novo', {
	  			url: '/paciente/novo',
	    		templateUrl:'views/paciente/novoPaciente.html',
	    		controller: 'pacienteCtlr'
  			}).

  			state('paciente', {
	  			url: '/paciente',
	    		templateUrl: 'views/paciente/homePaciente.html',
	    		controller: 'pacienteCtlr'
	  		});

	});


})
();