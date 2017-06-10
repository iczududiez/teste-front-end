angular.module("app").controller("pesquisaCtrl", ['$scope','pesquisaService', function pesquisaCtrl($scope, pesquisaService){
        $scope.required = true;
        $scope.videos = [];

        $scope.pesquisar = function(pesquisa){
            pesquisaService.getPesquisaVideos(pesquisa).then(function(response){
                console.log(response.data);
                $scope.videos = response.data.items;
                $scope.pesquisa.prevPageToken = response.data.prevPageToken;
                $scope.pesquisa.nextPageToken = response.data.nextPageToken;
                console.log("cassetdadata");
            },function(data){
                console.log(data);
            });
        }

        $scope.nextPage = function(pesquisa){
            $scope.pesquisa.pageToken = $scope.pesquisa.nextPageToken;
            $scope.pesquisar(pesquisa);
        }

        $scope.prevPage = function(pesquisa){
            $scope.pesquisa.pageToken = $scope.pesquisa.prevPageToken;
            $scope.pesquisar(pesquisa);
        }
}]);