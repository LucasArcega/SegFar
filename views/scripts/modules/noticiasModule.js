/**
 * Created by lucas on 11/11/2016.
 */
(function () {

    angular.module("noticias", ['ui.bootstrap']);

    app.service('sharedProperties', function() {
        var postagem = {codigo: 0,
            titulo: "",
            conteudo: "",
            facebook: "",
            youtube: ""
        };

        return {
            getPostagem: function() {
                return postagem;
            },

            setPostagemProp: function(prop,value) {
                postagem[prop] = value;
            }


        }

    });

    app.controller("PostagensController", function($scope,$http,$uibModal,$document,sharedProperties,$rootScope){

        $rootScope.editar ={};

        $scope.setPostagemProp = function(prop,value){

            sharedProperties.setPostagemProp(prop,value);

        };

        $rootScope.setEditar = function(objeto){

            $rootScope.editar = objeto;

        };


        $scope.dados = {};

        $rootScope.atualizarPostagens =  function() {
            $http.get("../controller/listarPostagens.php").success(function (data) {
                $scope.dados = data;
            });
        };

        $scope.atualizarPostagens();

        $scope.ModalDeleteOpen = function (size, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.container-fluid ' + parentSelector)) : undefined;

            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'modalDelete.html',
                controller: 'ModalInstanceController',
                controllerAs: 'modalInstance',
                appendTo: parentElem

            });

        };

        $scope.ModalEditOpen = function (size, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.container-fluid ' + parentSelector)) : undefined;

            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'modalForm.html',
                controller: 'ModalInstanceController',
                controllerAs: 'modalInstance',
                appendTo: parentElem,
                backdrop: 'static'

            });

            console.log(sharedProperties.getPostagem());


        };



    });

    app.controller('ModalInstanceController', function ($scope,$rootScope,$http,$uibModal ,$uibModalInstance,sharedProperties) {

        $scope.closeModal = function () {
            $uibModalInstance.close();
        };


        $rootScope.editarPostagemConfirmado = function(){

            $http({
                    url:"../controller/alteraPostagem.php",
                    data: $rootScope.editar,
                    method: 'post',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }

            ).then(function successCallback(response) {
                $scope.closeModal();
                $scope.modalMessageOpen('md','',response.data);

            }, function errorCallback(response) {
                $scope.closeModal();
                $scope.modalMessageOpen('md','',response.data);

            });

        };


        $scope.modalMessageOpen = function(taman,parentSelector,message){

            $rootScope.message = message;
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.container-fluid ' + parentSelector)) : undefined;

            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'modalMessage.html',
                controller: 'ModalInstanceController',
                controllerAs: 'modalInstance',
                appendTo: parentElem

            });



        };

        $scope.getPost = function(){

            $http({
                    url:"../controller/getPostagem.php",
                    data: {"codigoPostagem" : $scope.codigoPostagem},
                    method: 'post',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }

            ).then(function successCallback(response) {
                console.log(response.data);
                $scope.closeModal();
            }, function errorCallback(response) {
                console.log(response.data);
                $scope.closeModal();
            });



        };

        $scope.codigoPostagem = sharedProperties.getPostagem().codigo;

        $scope.deletePost = function(){

            $http({
                    url:"../controller/deletarPostagem.php",
                    data: {"codigoPostagem" : $scope.codigoPostagem},
                    method: 'post',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }

            ).then(function successCallback(response) {

                $scope.closeModal();
                $scope.modalMessageOpen('md','',response.data);
            }, function errorCallback(response) {

                $scope.closeModal();
                $scope.modalMessageOpen('md','',response.data);
            });





        };



    });
})();
