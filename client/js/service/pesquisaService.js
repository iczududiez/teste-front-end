angular.module("app").factory("pesquisaService",["$http","youTubeConfig", function pesquisaService($http,youTubeConfig){
    var _getPesquisaVideos = function(pesquisa){

            var config = {
                params:{
                    part: 'id,snippet',
                    q: pesquisa.termo,
                    maxResults:10,
                    pageToken: pesquisa.pageToken,
                    key: youTubeConfig.key,
                    videoEmbeddable:true,
                    type:'video'
                }
            }

            return $http.get(youTubeConfig.searchUrl, config)
    }

    var _getVideo = function(id){
        
        var config = {
            params:{
                part: 'snippet,statistics,contentDetails',
                'id':id,
                key: youTubeConfig.key
            }
        }

        return $http.get(youTubeConfig.videoUrl, config);
    }

    return {
        getPesquisaVideos : _getPesquisaVideos,
        getVideo : _getVideo
    }

}])