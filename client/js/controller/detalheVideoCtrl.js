angular.module("app").controller("detalheVideoCtrl",['$scope', 'video', '$sce','replaceQuebraLinhaFilter', function detalheVideoCtrl($scope, video, $sce, replaceQuebraLinhaFilter){
    $scope.video = video.data.items[0];
    $scope.urlVideo = "http://www.youtube.com/embed/" + $scope.video.id
    console.log($scope.urlVideo)
    $scope.urlVideo = $sce.trustAsResourceUrl($scope.urlVideo);
    console.log($scope.video)
    console.log($scope.urlVideo)
    $scope.video.snippet.description = replaceQuebraLinhaFilter($scope.video .snippet.description);
}]);