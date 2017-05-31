(function(){
	angular.
	module('farmaceutico',['ui.router']).
	controller("farmaceuticoCtlr", function ($scope, $rootScope, $http) {
		$rootScope.form={
			dadosPessoais: true,
			endereco:false,
			contato: false,
			basico:false
		};
		$rootScope.formNumber = [
			'dadosPessoais',
			'endereco',
			'medidas',
			'alergias',
			'alimentacao',
			'habitos'
		]
		$rootScope.atual = 0;
		$scope.campos = {};

		$scope.formViewSet = function(view){

			for(var viewPage in $rootScope.form){
				$rootScope.form[viewPage] = false;
			}
			$rootScope.form[view] = true;
			$rootScope.atual = $rootScope.formNumber.indexOf(view);
			//salvarPaciente();
		}

		$scope.formView = function(next){

			for(var viewPage in $rootScope.form){
				$rootScope.form[viewPage] = false;
			}
			if(next == true) {
				$rootScope.atual++;
			}
			else{
				$rootScope.atual--;
			}
			$rootScope.form[
							$rootScope.formNumber[
										$rootScope.atual
								]
						] = true;
			//salvarPaciente();
		}

		function salvarPaciente () {
			$http({
                method: "POST",
                url: "http://leozeraduarte-com-br.umbler.net/segfar/api/paciente",
                data: $scope.campos
            }).success(function(response){
            	console.log(response);
            });
		}
	}).
	config(function($stateProvider) {
  		$stateProvider.state(
			'homeFarmaceutico', {
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
  		}).
		state('conta',{
			url:'/farmaceutico/novoPaciente',
			views: {
		        'sidebar-mobile': {
					templateUrl: 'views/sidebars/homeFarmaceutico.html',
					controller: 'farmaceuticoCtlr'
				},
		        'main': {
					templateUrl: 'views/farmaceutico/dados.html',
		    		controller: 'farmaceuticoCtlr'
				}
			}
		});
	});
})
();
