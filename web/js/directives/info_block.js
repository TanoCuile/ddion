function initializeInfoBlockDirective(app) {
    app.directive('infoBlock', ['BlockManager', '$compile', '$templateCache', function(BlockManager, $compile, $templateCache){
        return {
            restrict: 'E',
            scope: {
                blockId: '=',
                blocks: '='
            },
            link: function($scope, el) {
                $scope.block = $scope.blocks[$scope.blockId];
                $scope.block.$apply = $scope.$apply.bind($scope);
                BlockManager.getTemplateFromData($scope.block, $templateCache, function(content) {
                    el = el.replaceWith($compile(content)($scope));
                });
            }
        }
    }]);
}