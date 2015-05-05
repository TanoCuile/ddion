function initializeFooterDirective(app) {
    app.directive('footer', ['BlockManager', '$compile', '$templateCache', function(BlockManager, $compile, $templateCache){
        return {
            restrict: 'E',
            template: '<div class="footer-controls">' +
                '<div class="controls" ng-class="' +
                "{'visible': (hasFooter), 'invisible-height': (!hasFooter),'test':true}" +
                '"></div></div>',
            link: function($scope, el){
                $scope.hasFooter = false;
                $scope.$on('activateBlock', function(e, data){
                    $scope.hasFooter = BlockManager.hasFooter(data);
                    var footerControls = el.find('.footer-controls .controls');
                    if ($scope.hasFooter) {
                        footerControls.empty();
                        BlockManager.getFooterTemplate(data, $templateCache, function(content) {
                            $scope.block = data;
                            footerControls.append($compile(content)($scope));
                        });
                    } else {
                        footerControls.empty();
                    }
                });
            }
        }
    }]);
}