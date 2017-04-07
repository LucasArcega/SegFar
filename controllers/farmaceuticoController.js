(function(){

	angular.
	module('farmaceutico',['ui.router']).	
	controller("farmaceuticoCtlr", function ($scope, $rootScope) {			
		$scope.form = [];
		$scope.pagina= "farmaceutico";
		$scope.nome = "João";
		
		$scope.form['dadosPessoais'] = true;
		$scope.form['contato'] = false;

		
		$scope.formNumber =[];
		$scope.formNumber[0] = "dadosPessoais";
		$scope.formNumber[1] = "contato";

		$scope.atual = 0;

		$scope.formView = function(next){

			for(var viewPage in $scope.form){
				$scope.form[viewPage] = false;
			}			
			if(next == true) {
				$scope.atual++;
			}
			else{
				$scope.atual--;	
			}
			$scope.form[$scope.formNumber[$scope.atual]] = true;
		}

	}).
	config(function($stateProvider) {
  		$stateProvider.state('farmaceutico', {
  			url:'/farmaceutico',
    		templateUrl: 'views/farmaceutico/homeFarmaceutico.html',
    		controller: 'farmaceuticoCtlr'
  		}).
  		state('novoPaciente', {
  			url:'/farmaceutico/novoPaciente',
    		templateUrl: 'views/paciente/novoPaciente.html',
    		controller: 'farmaceuticoCtlr',
    		data:{pagina:"Novo Paciente"}
  		});
	});
})
();