function initializeProjectController(app) {
    app.controller('ProjectController', ['$scope', '$routeParams', 'BlockManager', 'Loader', function($scope,$routeParams, BlockManager, Loader){
        var pageDataUrl = Loader.getPageUrl('project_basepath') + $routeParams.projectId + Loader.getProjectDataExtension();
        BlockManager.loadPageData(pageDataUrl, function(data){
            $scope.$parent.$broadcast("LoadPageData", data);
        });
    }]);
}