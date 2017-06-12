angular.module("app").config(function($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"view/pesquisa.html",
        controller:"pesquisaCtrl"
    }).when("/detalheVideo/:id",{
        templateUrl:"view/detalheVideo.html",
        controller:"detalheVideoCtrl",
        resolve:{
            video:function(pesquisaService, $route){
               return pesquisaService.getVideo($route.current.params.id);
            }
        }
    }).otherwise(
        {redirectTo: "/"}
    );
});