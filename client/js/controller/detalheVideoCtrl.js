angular.module("app").controller("detalheVideoCtrl",['$scope', 'video', '$sce','replaceQuebraLinhaFilter', 'replaceLinkFilter', function detalheVideoCtrl($scope, video, $sce, replaceQuebraLinhaFilter, replaceLinkFilter){
    $scope.video = video.data.items[0];
    $scope.urlVideo = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + $scope.video.id);
    $scope.video.snippet.description = replaceLinkFilter(replaceQuebraLinhaFilter($scope.video .snippet.description));
}]);