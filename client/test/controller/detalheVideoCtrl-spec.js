describe('detalheVideoCtrl', function() {
    var $rootScope,
        $scope,
        $sce,
        $filter,
        video,
        replaceQuebraLinhaFilter,
        replaceLinkFilter,
        controller;

    beforeEach(function() {
        module('app');

        inject(function ($injector){
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $sce = $injector.get('$sce');
            video = {"data":{"kind":"youtube#videoListResponse","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/avfIyIWyY-dGgOXa3DP7-tBQ7NM\"","pageInfo":{"totalResults":1,"resultsPerPage":1},"items":[{"kind":"youtube#video","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/PT6N81B6wZdy9hs0zQVNNuf7caI\"","id":"GV2hsmRUAlU","snippet":{"publishedAt":"2009-10-10T20:00:53.000Z","channelId":"UCaDb9CyLpnWgYfHr7rr5u2g","title":"Mundo Canibal - Aula de ingles","description":" ","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/GV2hsmRUAlU/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/GV2hsmRUAlU/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/GV2hsmRUAlU/hqdefault.jpg","width":480,"height":360}},"channelTitle":"jonathan moreno","tags":["mundo","canibal","whathell","sr","donizildo","aula","ingles","escola"],"categoryId":"23","liveBroadcastContent":"none","localized":{"title":"Mundo Canibal - Aula de ingles","description":""}},"contentDetails":{"duration":"PT4M59S","dimension":"2d","definition":"sd","caption":"false","licensedContent":false,"projection":"rectangular"},"statistics":{"viewCount":"2739547","likeCount":"17367","dislikeCount":"1102","favoriteCount":"0","commentCount":"662"}}]},"status":200,"config":{"method":"GET","transformRequest":[null],"transformResponse":[null],"jsonpCallbackParam":"callback","params":{"part":"snippet,statistics,contentDetails","id":"GV2hsmRUAlU","key":"AIzaSyBTo8mOJjxoqYSXEkdIZQdz07ldQndgKaA"},"url":"https://www.googleapis.com/youtube/v3/videos","headers":{"Accept":"application/json, text/plain, */*"}},"statusText":""};
            $filter = $injector.get("$filter");
            replaceQuebraLinhaFilter = $filter('replaceQuebraLinha');
            replaceLinkFilter = $filter('replaceLink');
            controller = $injector.get('$controller')("detalheVideoCtrl",{'$scope': $scope, 'video':video,'replaceQuebraLinhaFilter': replaceQuebraLinhaFilter,'replaceLinkFilter': replaceLinkFilter});
        });
    });

    describe('Inicializacao', function() {
        
        it('Deve atribuir o valor da posicao 0 do array de video.data.items para $scope.video', function() {
            expect($scope.video).toEqual(video.data.items[0]);
        });
        
        it('Deve atribuir o valor tratado e concatenado de $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + $scope.video.id) para $scope.urlVideo', function() {
            var valorTratado = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + $scope.video.id);
            expect(valorTratado.$$unwrapTrustedValue()).toEqual($scope.urlVideo.$$unwrapTrustedValue());
        });
        
        it('Deve atribuir o valor tratado de $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + $scope.video.id) para $scope.video.snippet.description', function() {
            var valorTratado = replaceLinkFilter(replaceQuebraLinhaFilter($scope.video.snippet.description));
            expect($scope.video.snippet.description).toEqual(valorTratado);
        });
        
    });
});