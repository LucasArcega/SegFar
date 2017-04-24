(function(){
	angular.
	module('farmaceutico',['ui.router']).
	controller("farmaceuticoCtlr", function ($scope, $rootScope) {
		$rootScope.form={
			dadosPessoais: true,
			contato: false
		};
		$rootScope.formNumber = {
			0:'dadosPessoais',
			1:'contato'
		}
		$scope.formViewSet = function(view){
			for(var viewPage in $rootScope.form){
				$rootScope.form[viewPage] = false;
			}
			$rootScope.form[view] = true;
		}

		$scope.formView = function(next){

			for(var viewPage in $rootScope.form){
				$rootScope.form[viewPage] = false;
			}
			if(next == true) {
				$scope.atual++;
			}
			else{
				$scope.atual--;
			}
			$rootScope.form[$rootScope.formNumber[$rootScope.atual]] = true;
		}
	}).
	config(function($stateProvider) {
  		$stateProvider.state('homeFarmaceutico', {
			url:'/farmaceutico',
			views: {
		        'sidebar-mobile': {
					templateUrl: 'views/sidebars/homeFarmaceutico.html',
		    		controller: 'farmaceuticoCtlr'
				},
		        'main': {
					templateUrl: 'views/farmaceutico/homeFarmaceutico.html',
		    		controller: 'farmaceuticoCtlr'
				}
			}
  		}).
  		state('novoPaciente', {
  			url:'/farmaceutico/novoPaciente',
			views: {
		        'sidebar-mobile': {
					templateUrl: 'views/sidebars/novoPaciente.html',
					controller: 'farmaceuticoCtlr'
				},
		        'main': {
					templateUrl: 'views/paciente/novoPaciente.html',
		    		controller: 'farmaceuticoCtlr'
				}
			}
  		});
	});
})
();
