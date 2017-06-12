describe('pesquisaCtrl', function() {
    var $rootScope,
        controller,
        $scope,
        $factory,
        pesquisaService,
        $q,
        $cacheFactory,
        pesquisa;

    beforeEach(function() {
        module('app');

        inject(function ($injector){
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            pesquisaService = $injector.get('pesquisaService');
            $cacheFactory = $injector.get('$cacheFactory');
            $q = $injector.get("$q");
            controller = $injector.get('$controller')("pesquisaCtrl",{'$scope': $scope, 'pesquisaService':pesquisaService,'$cacheFactory':$cacheFactory});
        });

        pesquisa = $scope.pesquisa;
    });

    describe('Inicializacao', function() {
        
        it('Deve inicar required com true', function() {
            expect($scope.required).toBe(true);
        });
        
        it('Deve inicar videos com tamanho 0', function() {
            expect($scope.videos.length).toEqual(0);
        });
        
        it('Deve iniciar buscaRealizada com false', function() {
            expect($scope.buscaRealizada).toBe(false);
        });
        
        it("Deve iniciar pesquisa com {'resetToken': false}", function() {
            expect(pesquisa).toEqual({'resetToken': false});
        });
        
        describe('Condicional cache', function() {
            
            it('Deve manter o valor inicial de pesquisa caso não tenha cache', function() {
                expect($scope.cache.get('objPesquisa')).toBeUndefined();
                expect(pesquisa).toEqual({'resetToken': false});
            });
            
            it('Deve mudar o valor inicial de pesquisa para valor salvo em cache', function() {
                
                var objPesquisa =  {
                    "termo":"mundo canibal",
                    "resetToken":false
                }
                
                $scope.cache.put("objPesquisa",objPesquisa);

                if($scope.cache.get("objPesquisa")){
                    pesquisa = $scope.cache.get("objPesquisa");
                }

                expect(pesquisa).toEqual(objPesquisa);
            });
        });
    });
    
    describe('Eventos', function() {
        
        it('Deve passar o valor de pesquisa.resetToken para true', function() {
            expect(pesquisa.resetToken).toBe(false);
            $scope.resetToken(pesquisa);
            expect(pesquisa.resetToken).toBe(true);
        });
        
        describe('evento de pesquisa', function() {

            describe('Pós .then sucess', function() {

                var pesquisarSpy;

                beforeEach(function(){
                    pesquisarSpy = spyOn(pesquisaService, 'getPesquisaVideos').and.callFake(function(){
                        var deferred = $q.defer();
                        deferred.resolve({"data":{"kind":"youtube#searchListResponse","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/eQslQ2WIjtOQQk0Yxe6NSGMQJQU\"","nextPageToken":"CB4QAA","prevPageToken":"CBQQAQ","regionCode":"BR","pageInfo":{"totalResults":139954,"resultsPerPage":10},"items":[{"kind":"youtube#searchResult","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/yj5U7DQEH5O5WGhG_lU9ehidvR4\"","id":{"kind":"youtube#video","videoId":"F_299aAFDXw"},"snippet":{"publishedAt":"2011-03-04T14:26:00.000Z","channelId":"UC7_P4sNWt4sKEwS-tIr63ew","title":"Bonecos Preconceito","description":"Mais vídeos em http://www.mundocanibal.com.br.","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/F_299aAFDXw/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/F_299aAFDXw/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/F_299aAFDXw/hqdefault.jpg","width":480,"height":360}},"channelTitle":"Mundo Canibal","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/LdxBkQEC4ltXOZ5c_PoKVx2igqU\"","id":{"kind":"youtube#video","videoId":"nlMWS9hrcls"},"snippet":{"publishedAt":"2011-03-04T09:41:49.000Z","channelId":"UC7_P4sNWt4sKEwS-tIr63ew","title":"Briga de Galo","description":"Mais vídeos em http://www.mundocanibal.com.br.","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/nlMWS9hrcls/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/nlMWS9hrcls/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/nlMWS9hrcls/hqdefault.jpg","width":480,"height":360}},"channelTitle":"Mundo Canibal","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/OajDPLB2Vlub7Q_Z2nY5tmnwXHI\"","id":{"kind":"youtube#video","videoId":"xD0eeieVI1o"},"snippet":{"publishedAt":"2011-03-04T09:33:33.000Z","channelId":"UC7_P4sNWt4sKEwS-tIr63ew","title":"Cinto de Segurança do Mundo Canibal","description":"Mais vídeos em http://www.mundocanibal.com.br.","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/xD0eeieVI1o/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/xD0eeieVI1o/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/xD0eeieVI1o/hqdefault.jpg","width":480,"height":360}},"channelTitle":"Mundo Canibal","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/KD4Tru_hbWYdLa462tqzU9ZcLdw\"","id":{"kind":"youtube#video","videoId":"jXkzKUl-s48"},"snippet":{"publishedAt":"2011-03-04T06:02:48.000Z","channelId":"UC7_P4sNWt4sKEwS-tIr63ew","title":"Treco - O Narrador do Mundo Canibal","description":"Mais vídeos em http://www.mundocanibal.com.br.","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/jXkzKUl-s48/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/jXkzKUl-s48/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/jXkzKUl-s48/hqdefault.jpg","width":480,"height":360}},"channelTitle":"Mundo Canibal","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/n5EewvzP7aCaJeWowM0s_xauvMM\"","id":{"kind":"youtube#video","videoId":"iXO3A9Z0JVw"},"snippet":{"publishedAt":"2011-03-25T21:03:02.000Z","channelId":"UC7_P4sNWt4sKEwS-tIr63ew","title":"Mundo Canibal Terror  - Crianças","description":"Sabe aquele joguinho de assustar a galera? Veja os melhores (ou piores) momentos captados quando CRIANÇAS são apresentadas a jogatina. Mais vídeos: ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/iXO3A9Z0JVw/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/iXO3A9Z0JVw/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/iXO3A9Z0JVw/hqdefault.jpg","width":480,"height":360}},"channelTitle":"Mundo Canibal","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/tM0UyJtlZP5NflE4XvTfzdifmMM\"","id":{"kind":"youtube#video","videoId":"PkO3A5zk7gk"},"snippet":{"publishedAt":"2011-09-17T05:05:07.000Z","channelId":"UCxljGalgzf8KLZeAlmrViuw","title":"Mundo Canibal -Sr Donizildo e a Sacola Ecológica","description":"Sr Donizildo e a Sacola Ecológica.","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/PkO3A5zk7gk/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/PkO3A5zk7gk/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/PkO3A5zk7gk/hqdefault.jpg","width":480,"height":360}},"channelTitle":"batousairimura","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/e1QCFFeL-Nj88YLaLMrPQw3FtAk\"","id":{"kind":"youtube#video","videoId":"2mSr-qqg10Y"},"snippet":{"publishedAt":"2011-01-09T02:32:59.000Z","channelId":"UCMimQzuNUzMCRKUgB7fcZsA","title":"Natação das teta-Mundo Canibal","description":"Se vc gostou desse video e que assistir mais videos como esse é so entra no site oficial do Mundo Canibal ----------------------- Site Mundo Canibal: ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/2mSr-qqg10Y/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/2mSr-qqg10Y/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/2mSr-qqg10Y/hqdefault.jpg","width":480,"height":360}},"channelTitle":"superxxx20101","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/2xU1-2UEM_kTCIR27G4LK9XFVbY\"","id":{"kind":"youtube#video","videoId":"lDIFJbo-cmw"},"snippet":{"publishedAt":"2014-08-31T19:35:57.000Z","channelId":"UCtDYQgSFtTZt_tJXy_SLejw","title":"Eleiçoes Mundo Canibal 2014","description":"Os novos cadindatos.","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/lDIFJbo-cmw/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/lDIFJbo-cmw/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/lDIFJbo-cmw/hqdefault.jpg","width":480,"height":360}},"channelTitle":"jhs2314","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/U3zQRx7qAn7Fl2qNwa7F6dAqlRY\"","id":{"kind":"youtube#video","videoId":"RiovnjNOrnQ"},"snippet":{"publishedAt":"2012-05-13T17:56:49.000Z","channelId":"UC7F6P5HwD_9Co3fPwx3rnhQ","title":"Da Hadouken Ryu - Pastor Metralhadora - Mundo Canibal","description":"Vídeo Produzido pelo mundo canibal.","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/RiovnjNOrnQ/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/RiovnjNOrnQ/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/RiovnjNOrnQ/hqdefault.jpg","width":480,"height":360}},"channelTitle":"- Lopes","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/ZD0VmQx7UVpvxv7Xrbbu54PRYY0\"","id":{"kind":"youtube#video","videoId":"QcDJkHSu1y8"},"snippet":{"publishedAt":"2014-01-04T22:07:10.000Z","channelId":"UCtnGcBmq6CueiEW8cJTCh3w","title":"Mundo Canibal (medo de barata)","description":"","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/QcDJkHSu1y8/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/QcDJkHSu1y8/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/QcDJkHSu1y8/hqdefault.jpg","width":480,"height":360}},"channelTitle":"Claudinei Silva","liveBroadcastContent":"none"}}]},"status":200,"config":{"method":"GET","transformRequest":[null],"transformResponse":[null],"jsonpCallbackParam":"callback","params":{"part":"id,snippet","q":"mundo canibal","maxResults":10,"pageToken":"CBQQAA","key":"AIzaSyBTo8mOJjxoqYSXEkdIZQdz07ldQndgKaA","videoEmbeddable":true,"type":"video"},"url":"https://www.googleapis.com/youtube/v3/search","headers":{"Accept":"application/json, text/plain, */*"}},"statusText":""});
                        return deferred.promise;
                    });

                    pesquisa.termo = "mundo canibal";
                    $scope.resetToken(pesquisa);    
                });

                it('Deve modificar o tamanho do objeto de videos', function() {
                    expect($scope.videos.length).toEqual(0);
                    $scope.pesquisar(pesquisa);
                    $scope.$apply();//aplica as modifições no $scope após o .then
                    expect($scope.videos.length).toEqual(10);
                });
                
                it('Deve passar valor do nexxtPageToken para pesquisa.nextPageToken', function() {
                    expect(pesquisa.nextPageToken).toBeUndefined();
                    $scope.pesquisar(pesquisa);
                    $scope.$apply();//aplica as modifições no $scope após o .then
                    expect(pesquisa.nextPageToken).toEqual("CB4QAA");
                });

                
                it('Deve passar valor do prevPageToken para pesquisa.prevPageToken', function() {
                    expect(pesquisa.prevPageToken).toBeUndefined();
                    $scope.pesquisar($scope.pesquisa);
                    $scope.$apply();//aplica as modifições no $scope após o .then
                    expect(pesquisa.prevPageToken).toEqual('CBQQAQ');
                });
                
                it('Deve atribuir o valor de pesquisa.termo para pesquisa.ultimoTermo', function() {
                    expect(pesquisa.ultimoTermo).toBeUndefined();
                    $scope.pesquisar($scope.pesquisa);
                    $scope.$apply();//aplica as modifições no $scope após o .then
                    expect(pesquisa.ultimoTermo).toEqual(pesquisa.termo);
                });

                
                it('Deve atribuir o valor false para pesquisa.resetToken', function() {
                    expect(pesquisa.resetToken).toBe(true);
                    $scope.pesquisar($scope.pesquisa);
                    $scope.$apply();//aplica as modifições no $scope após o .then
                    expect(pesquisa.resetToken).toBe(false);
                }); 
                
                it('Deve atribuir o valor true para buscaRealizada', function() {
                    expect($scope.buscaRealizada).toBe(false);
                    $scope.pesquisar($scope.pesquisa);
                    $scope.$apply();//aplica as modifições no $scope após o .then
                    expect($scope.buscaRealizada).toBe(true);
                });
                
                it('Deve atribuir o objeto pessoa para o cache', function() {
                    $scope.pesquisar($scope.pesquisa);
                    $scope.$apply();//aplica as modifições no $scope após o .then
                    expect($scope.cache.get('objPesquisa')).toEqual($scope.pesquisa);
                });

                
                describe('Paginacao', function() {

                    beforeEach(function() {
                        $scope.pesquisar($scope.pesquisa);
                        $scope.$apply();
                    });
                    
                    it('Deve atribuir false para pesquisa.resetToken', function() {
                        $scope.nextPage($scope.pesquisa);
                        $scope.$apply();//aplica as modifições no $scope após o .then
                        expect(pesquisa.resetToken).toBe(false);
                        $scope.prevPage($scope.pesquisa);
                        $scope.$apply();//aplica as modifições no $scope após o .then
                        expect(pesquisa.resetToken).toBe(false);
                    });
                    
                    it('Deve atribuir o valor de pesquisa.termo para pesquisa.ultimoTermo', function() {
                        $scope.nextPage($scope.pesquisa);
                        $scope.$apply();//aplica as modifições no $scope após o .then
                        expect(pesquisa.ultimoTermo).toEqual(pesquisa.termo);
                        $scope.prevPage($scope.pesquisa);
                        $scope.$apply();//aplica as modifições no $scope após o .then
                        expect(pesquisa.ultimoTermo).toEqual(pesquisa.termo);
                    });

                    
                    describe('prevTokenPage null or undefined', function() {
                        
                        beforeEach(function() {
                            pesquisa.prevPageToken = null;
                            pesquisa.termo = "mundo";
                        }); 
                        
                        it('Deve manter o valor de pesquisa.resetToken', function() {
                            var valorAnterior = pesquisa.resetToken;
                            $scope.prevPage($scope.pesquisa);
                            $scope.$apply();//aplica as modifições no $scope após o .then
                            expect(valorAnterior).toEqual(pesquisa.resetToken);

                        });

                        it('Deve manter o valor do pesquisa.ultimoTermo mesmo havendo modificacao no pesquisa termo', function() {
                            var valorAnterior = pesquisa.ultimoTermo;
                            $scope.prevPage($scope.pesquisa);
                            $scope.$apply();//aplica as modifições no $scope após o .then
                            expect(valorAnterior).toEqual(pesquisa.ultimoTermo);
                            expect(pesquisa.ultimoTermo != pesquisa.termo).toBe(true);
                        });    
                    });

                    describe('nextTokenPage null or undefined', function() {
                        
                        beforeEach(function() {
                            pesquisa.nextPageToken = null;
                            pesquisa.termo = "mundo";
                        }); 
                        
                        it('Deve manter o valor de pesquisa.resetToken', function() {
                            var valorAnterior = pesquisa.resetToken;
                            $scope.nextPage($scope.pesquisa);
                            $scope.$apply();//aplica as modifições no $scope após o .then
                            expect(valorAnterior).toEqual(pesquisa.resetToken);

                        });

                        it('Deve manter o valor do pesquisa.ultimoTermo mesmo havendo modificacao no pesquisa termo', function() {
                            var valorAnterior = pesquisa.ultimoTermo;
                            $scope.nextPage($scope.pesquisa);
                            $scope.$apply();//aplica as modifições no $scope após o .then
                            expect(valorAnterior).toEqual(pesquisa.ultimoTermo);
                            expect(pesquisa.ultimoTermo != pesquisa.termo).toBe(true);
                        }); 
                        
                    });     
                });
            });

            describe('Novo termo', function() {

                var pesquisarSpyNvovoTermo;

                beforeEach(function(){
                    pesquisarSpyNvovoTermo = spyOn(pesquisaService, 'getPesquisaVideos').and.callFake(function(){
                        var deferred = $q.defer();
                        deferred.resolve({"data":{"kind":"youtube#searchListResponse","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/LBmR5adnFz1O8tDYZrKQEN5TOq8\"","nextPageToken":"CAoQAA","regionCode":"BR","pageInfo":{"totalResults":139969,"resultsPerPage":10},"items":[{"kind":"youtube#searchResult","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/UDITovPQrHx7KWfVKhNW40pUwt0\"","id":{"kind":"youtube#video","videoId":"GV2hsmRUAlU"},"snippet":{"publishedAt":"2009-10-10T20:05:10.000Z","channelId":"UCaDb9CyLpnWgYfHr7rr5u2g","title":"Mundo Canibal - Aula de ingles","description":"","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/GV2hsmRUAlU/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/GV2hsmRUAlU/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/GV2hsmRUAlU/hqdefault.jpg","width":480,"height":360}},"channelTitle":"jonathan moreno","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/gDCnGzisEVJS1LgJ-K0OYtqWi-k\"","id":{"kind":"youtube#video","videoId":"igz01uz7cFI"},"snippet":{"publishedAt":"2015-02-12T10:38:17.000Z","channelId":"UCP0GI-IbEZV59oExPioxeHw","title":"ParTOBA 24 - INÉDITO!","description":"Preço baixo é na BiGBoyGames: http://bit.ly/big_boy_games Dessa vez você vai conhecer o Campeão do ParTOBA, Miss Crentinha e SDV, Mr Amigão, Boliche, ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/igz01uz7cFI/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/igz01uz7cFI/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/igz01uz7cFI/hqdefault.jpg","width":480,"height":360}},"channelTitle":"Irmãos Piologo","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/mtaEwn6aTTWLDzp26HeQwb3X39M\"","id":{"kind":"youtube#video","videoId":"1w6rlxi79xk"},"snippet":{"publishedAt":"2012-07-08T21:55:02.000Z","channelId":"UC-tFirwXK8gxEMJv-bLjJjw","title":"Mundo Canibal Duelos Animados","description":"Mundo Canibal Lutas por Leandro Horning minha Homenagem ao mundo canibal e aos fake chuck noía e o melhor dos melhores pastor metralhadora TaTa ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/1w6rlxi79xk/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/1w6rlxi79xk/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/1w6rlxi79xk/hqdefault.jpg","width":480,"height":360}},"channelTitle":"HASHTAGNEWS","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/duoSoPXmDhYUl6HyiipRW08JIJ0\"","id":{"kind":"youtube#video","videoId":"kxeGIkmmm-U"},"snippet":{"publishedAt":"2011-10-06T15:12:37.000Z","channelId":"UC7_P4sNWt4sKEwS-tIr63ew","title":"Mundo Canibal Terror 4","description":"Nessa edição estão presentes até personalidades famosas do cinema, como Pinhead do Hellraiser! Mais vídeos em http://www.mundocanibal.com.br.","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/kxeGIkmmm-U/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/kxeGIkmmm-U/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/kxeGIkmmm-U/hqdefault.jpg","width":480,"height":360}},"channelTitle":"Mundo Canibal","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/FZBoGqIKlxYPaysLQaF5zj96dBk\"","id":{"kind":"youtube#video","videoId":"LVpdpUMuzew"},"snippet":{"publishedAt":"2013-08-08T12:46:01.000Z","channelId":"UCHey9tIKN2IyTO2Enyq78SQ","title":"Mundo Canibal.Aeromoça!!","description":"","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/LVpdpUMuzew/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/LVpdpUMuzew/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/LVpdpUMuzew/hqdefault.jpg","width":480,"height":360}},"channelTitle":"Warleson Soares","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/ZQpQUxAbjQoRZ4Qdz4PFxx3fseE\"","id":{"kind":"youtube#video","videoId":"i5i88m-OZ0s"},"snippet":{"publishedAt":"2012-02-02T04:18:00.000Z","channelId":"UCZqUJNv_behWr33O0BJwTjA","title":"Mundo Canibal","description":"Tome Rola.","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/i5i88m-OZ0s/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/i5i88m-OZ0s/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/i5i88m-OZ0s/hqdefault.jpg","width":480,"height":360}},"channelTitle":"Luan Souza","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/tC2loq0dnDhg7LdmRn97lIVC6hU\"","id":{"kind":"youtube#video","videoId":"7a2r2fz5Zvs"},"snippet":{"publishedAt":"2015-03-05T17:00:01.000Z","channelId":"UCP0GI-IbEZV59oExPioxeHw","title":"Boby Psicótico e Drogy Guaraná","description":"CONHEÇA o PIPOCANDO: http://goo.gl/yJwmbI Boby quer tomar algo \"diferente\" e resolve experimentar o novo e delicioso Drogy Guaraná! JOGO Mundo ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/7a2r2fz5Zvs/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/7a2r2fz5Zvs/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/7a2r2fz5Zvs/hqdefault.jpg","width":480,"height":360}},"channelTitle":"Irmãos Piologo","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/n8pd6QhN3-tKdrCHB4f9X4cyXNI\"","id":{"kind":"youtube#video","videoId":"QTvLYmcT3Tg"},"snippet":{"publishedAt":"2017-05-25T12:50:31.000Z","channelId":"UCP0GI-IbEZV59oExPioxeHw","title":"ParTOBA 34","description":"ARCADE dos Irmãos Piologo: https://goo.gl/6Vlvk0 http://www.gameteczone.com.br RAPAZIADA, nesse ParTOBA tem Miss América, Miss Estrela Cadente, Miss ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/QTvLYmcT3Tg/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/QTvLYmcT3Tg/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/QTvLYmcT3Tg/hqdefault.jpg","width":480,"height":360}},"channelTitle":"Irmãos Piologo","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/ig4gT-Z2vRbyftGNky07HQwLH6c\"","id":{"kind":"youtube#video","videoId":"qcwS6NCvKys"},"snippet":{"publishedAt":"2011-03-04T07:16:20.000Z","channelId":"UC7_P4sNWt4sKEwS-tIr63ew","title":"O dia em que a Terra parou","description":"Mais vídeos em http://www.mundocanibal.com.br.","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/qcwS6NCvKys/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/qcwS6NCvKys/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/qcwS6NCvKys/hqdefault.jpg","width":480,"height":360}},"channelTitle":"Mundo Canibal","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/N_hk-t3nk6IXVdRBCWDIS4Drmho\"","id":{"kind":"youtube#video","videoId":"3WJoRteVdVM"},"snippet":{"publishedAt":"2009-11-14T00:32:14.000Z","channelId":"UCD79f2EaLJRZpz0LhSoffvg","title":"Mundo Canibal Sr Donizildo","description":"","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/3WJoRteVdVM/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/3WJoRteVdVM/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/3WJoRteVdVM/hqdefault.jpg","width":480,"height":360}},"channelTitle":"Jessika Leyne","liveBroadcastContent":"none"}}]},"status":200,"config":{"method":"GET","transformRequest":[null],"transformResponse":[null],"jsonpCallbackParam":"callback","params":{"part":"id,snippet","q":"mundo canibal","maxResults":10,"pageToken":null,"key":"AIzaSyBTo8mOJjxoqYSXEkdIZQdz07ldQndgKaA","videoEmbeddable":true,"type":"video"},"url":"https://www.googleapis.com/youtube/v3/search","headers":{"Accept":"application/json, text/plain, */*"}},"statusText":""});
                        return deferred.promise;
                    });

                    pesquisa.termo = "mundo canibal";
                    $scope.resetToken($scope.pesquisa);    
                });

                
                describe('Pós .then sucess', function() {
                
                    it('Deve passar valor do nexxtPageToken para pesquisa.nextPageToken', function() {
                        expect(pesquisa.nextPageToken).toBeUndefined();
                        $scope.pesquisar($scope.pesquisa);
                        $scope.$apply();//aplica as modifições no $scope após o .then
                        expect(pesquisa.nextPageToken).toEqual("CAoQAA");
                    });

                    it('Deve manter p valor de psquisa.prevPageToken como undefined', function() {
                        expect(pesquisa.prevPageToken).toBeUndefined();
                        $scope.pesquisar($scope.pesquisa);
                        $scope.$apply();//aplica as modifições no $scope após o .then
                        expect(pesquisa.prevPageToken).toBeUndefined();
                    });
                });
            });
        });
    });
});