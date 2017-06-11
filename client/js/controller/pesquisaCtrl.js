angular.module("app").controller("pesquisaCtrl", ['$scope', 'pesquisaService', '$cacheFactory', function pesquisaCtrl($scope, pesquisaService, $cacheFactory){
        
        var cache = $cacheFactory.get('pesquisa') || $cacheFactory('pesquisa');
        
        $scope.required = true;
        $scope.videos = [];
        $scope.buscaRealizada = false;
        $scope.pesquisa = {'resetToken': false};       

        $scope.pesquisar = function pesquisar(pesquisa){

            pesquisa.prevPageToken = null;
            pesquisa.nextPageToken = null;
            
            if(pesquisa.resetToken){
                pesquisa.pageToken = null;
                pesquisa.resetToken = false;
            }

            pesquisaService.getPesquisaVideos(pesquisa).then(function(response){
                $scope.videos = response.data.items;
                $scope.pesquisa.prevPageToken = response.data.prevPageToken;
                $scope.pesquisa.nextPageToken = response.data.nextPageToken;
                cache.put("objPesquisa",$scope.pesquisa);
                $scope.buscaRealizada = true;
                //console.log($scope.videos);
                console.log(cache);
                console.log(cache.get("objPesquisa"));
            },function(data){
            });
        }

        $scope.nextPage = function nextPage(pesquisa){
            if($scope.pesquisa.nextPageToken){
                $scope.pesquisa.pageToken = $scope.pesquisa.nextPageToken;
                $scope.pesquisar(pesquisa);
            }
        }

        $scope.prevPage = function prevPage(pesquisa){
            if($scope.pesquisa.prevPageToken){
                $scope.pesquisa.pageToken = $scope.pesquisa.prevPageToken;
                $scope.pesquisar(pesquisa);
            }
        }

        $scope.resetToken = function resetToken(pesquisa){
            pesquisa.resetToken = true;
        }

        if(cache.get("objPesquisa")){
            $scope.pesquisa = cache.get("objPesquisa");
            $scope.pesquisar($scope.pesquisa);
        }
}]);