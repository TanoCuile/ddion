function initializeContentController(app) {
    app.controller('ContentController', ['$scope', 'PageData', function($scope, PageData){
        $scope.blockHeight = PageData.getPageData().height - PageData.getContentOffset();
    }]);
}