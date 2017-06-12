angular.module("app").controller("pesquisaCtrl", ['$scope', 'pesquisaService', '$cacheFactory', function pesquisaCtrl($scope, pesquisaService, $cacheFactory){
        
        $scope.cache = $cacheFactory.get('pesquisa') || $cacheFactory('pesquisa');
        $scope.required = true;
        $scope.videos = [];
        $scope.buscaRealizada = false;
        $scope.pesquisa = {'resetToken': false};       
        
        $scope.pesquisar = function pesquisar(pesquisa){

            pesquisa.prevPageToken = null;
            pesquisa.nextPageToken = null;
            
            if(pesquisa.resetToken && $scope.buscaRealizada){
                pesquisa.pageToken = null;
            }

            pesquisaService.getPesquisaVideos(pesquisa).then(function(response){
                $scope.videos = response.data.items;
                $scope.pesquisa.prevPageToken = response.data.prevPageToken;
                $scope.pesquisa.nextPageToken = response.data.nextPageToken;
                $scope.pesquisa.ultimoTermo = $scope.pesquisa.termo;
                $scope.pesquisa.resetToken = false;
                $scope.buscaRealizada = true;
                $scope.cache.put("objPesquisa",$scope.pesquisa);
            },function(data){});
        }

        $scope.nextPage = function nextPage(pesquisa){
            if($scope.pesquisa.nextPageToken){
                $scope.pesquisa.termo = $scope.pesquisa.ultimoTermo;
                pesquisa.resetToken = false;
                $scope.pesquisa.pageToken = $scope.pesquisa.nextPageToken;
                $scope.pesquisar(pesquisa);
            }
        }

        $scope.prevPage = function prevPage(pesquisa){
            if($scope.pesquisa.prevPageToken){
                $scope.pesquisa.termo = $scope.pesquisa.ultimoTermo;
                pesquisa.resetToken = false;
                $scope.pesquisa.pageToken = $scope.pesquisa.prevPageToken;
                $scope.pesquisar(pesquisa);
            }
        }

        $scope.resetToken = function resetToken(pesquisa){
            pesquisa.resetToken = true;
        }

        if($scope.cache.get("objPesquisa")){
            $scope.pesquisa = $scope.cache.get("objPesquisa");
            $scope.pesquisar($scope.pesquisa);
        }
}]);