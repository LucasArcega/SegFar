(function () {

	var app = angular.module("membrosApp", ['ui.bootstrap']);
	
	app.directive("fileUpload", function(){

		return{

			scope: true,
			link: function (scope, element, attrs) {
				element.bind("change", function (event) {
					var files = event.target.files;
					for (var i= 0; i<files.length; i++){
						scope.$emit("fileSelected", { file: files[i] });
					}
				});
			}
		};

	});

	app.directive('membrosListados', function () {

		return{
			restrict:'E',
			templateUrl: "membros-listados.html"
		};

	});

    app.service('sharedProperties', function() {
        var membro = {codigo: 0,
            nome: "",
            sobre: "",
            foto: ""

        };

        return {
            getMembro: function() {
                return membro;
            },

            setMembroProp: function(prop,value) {
                membro[prop] = value;
            }


        }

    });
	app.controller("BackgroundCtlr", function ($http,$scope) {

		function SetBackgroundImage() {
			$http.get('../controller/GetBackgroundImage.php').success(function (data) {
				$scope.background = {'background-image':data};
			});
		}
		SetBackgroundImage();

	});

	app.controller("MembrosCtlr", function($uibModal,$http,$scope,$rootScope,sharedProperties){

		$rootScope.membro = {};

		function atualizarMembros () {

			$http.get('../controller/listarMembros.php').then(function (response) {
				$scope.membros = response.data;

				});

		}

		$scope.setMembroProp = function (prop,value) {
            sharedProperties.setMembroProp(prop,value);
        };

		atualizarMembros();

		$scope.inserirMembro = function (size, parentSelector) {
			$rootScope.membro = {
				nome: "",
				sobre: ""
			};
			$scope.formMembroOpen(size, parentSelector);

	  	};

		$scope.formMembroOpen = function (size, parentSelector) {
			var parentElem = parentSelector ?
				angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;

			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'modals/formMembro.html',
				controller: 'ModalInstanceCtrl',
				controllerAs: 'ModalInstance',
				size: size,
				appendTo: parentElem

			});

		};


		$rootScope.setEditarMembro = function (objeto) {
			$rootScope.membro = objeto;
		};
        $scope.ModalDeleteOpen = function (size, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.container-fluid ' + parentSelector)) : undefined;

            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'modals/modalDelete.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: 'modalInstance',
                appendTo: parentElem

            });

        };




	});

	app.controller("ModalInstanceCtrl", function($http,$scope,$rootScope,$uibModalInstance,$uibModal,sharedProperties){
		$scope.close = function(){
			$uibModalInstance.dismiss('cancel');
		};

        $scope.modalMessageOpen = function(taman,parentSelector,message) {

            $rootScope.message = message;
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.container-fluid ' + parentSelector)) : undefined;

            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'modals/modalMessage.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: 'modalInstance',
                appendTo: parentElem

            });
        };

		$scope.files = [];

		$scope.$on("fileSelected", function (event, args) {
			$scope.$apply(function () {
				//add the file object to the scope's files collection
				$scope.files[0] = args.file;
			});
		});
        $scope.codigoMembro = 0;


        $scope.deleteRegister = function () {
            $scope.codigoMembro = sharedProperties.getMembro().codigo;
            $http({
                    url:"../controller/deletarMembro.php",
                    data: {"codigoMembro" : $scope.codigoMembro},
                    method: 'post',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }

            ).then(function successCallback(response) {

                $scope.close();
                $scope.modalMessageOpen('md','',response.data);
            }, function errorCallback(response) {

                $scope.close();
                $scope.modalMessageOpen('md','',response.data);
            });

        };

		$scope.submit = function() {

	      	$http({
				method  : 'POST',
				url     : '../controller/inserirMembro.php',
				processData: false,
				transformRequest: function (data) {
		     	    var formData = new FormData();
					formData.append("membro", angular.toJson(data.membro));
					formData.append("image", data.image[0]);

					return formData;

				},
				data : {membro: $scope.membro,
						image: $scope.files
				},
				headers: {
					 'Content-Type': undefined
				}
			}).success(function(data){
				$scope.close();
				alert(data);

		    });

	    };


    });


})();