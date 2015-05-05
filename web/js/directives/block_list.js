function initializeBlockListDirective(app) {
    app.directive('blockList', ['BlockManager', 'Loader', 'PageData', function(BlockManager, Loader, PageData){
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/html/blocks/block_list.html.tpl',
            scope: {
                'blockHeight': '='
            },
            link: function($scope, el){
                $scope.blockHeight = PageData.getPageData().height - PageData.getContentOffset();
                var blockPrecession = 160;
                $scope.blocks = [];
                $scope.activeBlock = null;
                $scope.activeBlockId = null;
                var pageRoute = el.attr('page');
                if (pageRoute) {
                    var pageDataUrl = Loader.getPageUrl(pageRoute);
                    BlockManager.loadPageData(pageDataUrl, function(data){
                        $scope.$emit("LoadPageData", data);
                    });
                }
                $scope.$on('LoadPageData', function(e, data){
                    $scope.blocks = [];
                    angular.forEach(data.blocks, function(block, index){
                        var blockType = BlockManager.getBlock(block.type);
                        var entity = new blockType(block);
                        entity.follow = false;
                        entity.socLinksClass = ['invisible-height'];
                        if (index < data.blocks.length - 1) {
                            entity.blockStyle = {
                                'height': $scope.blockHeight+'px'
                            };
                        } else {
                            if (BlockManager.hasFooter(block)) {
                                entity.blockStyle = {
                                    'height': $scope.blockHeight+'px',
                                    'padding-bottom': 145 + 'px'
                                };
                            } else {
                                entity.blockStyle = {
                                    'height': ($scope.blockHeight + 140)+'px'
                                };
                            }
                        }
                        $scope.blocks.push(entity);
                    });
                    BlockManager.setBlockList($scope.blocks);
                    activateBlock(0);
                });
                function activateBlock(blockId, apply) {
                    if ($scope.activeBlockId != blockId && $scope.blocks[blockId].isActive()) {
                        if ($scope.activeBlock) {
                            $scope.activeBlock.disactivate();
                        }
                        $scope.activeBlock = $scope.blocks[blockId];
                        $scope.activeBlock.activate();
                        $scope.activeBlockId = blockId;
                        $scope.$emit('activateBlock', $scope.activeBlock);
                        if (apply) {
                            $scope.$apply();
                        }
                    }
                }

                $scope.$on('pageScroll', function(e, data){
                    var blockId = Math.floor((data.top * (-1) + blockPrecession) / $scope.blockHeight);
                    activateBlock(blockId, true);
                });
                $scope.$on('pageScrollFinished', function(e, data){
                    if ($scope.blocks.length > 1) {
                        var offset = Math.abs(data.top) % $scope.blockHeight;
                        var currentBlockId = Math.floor((data.top * (-1)) / $scope.blockHeight);
                        var position = 0;
                        if (offset < $scope.blockHeight - 160 && offset != 0) {
                            position = $scope.blockHeight * currentBlockId;
                        } else if ($scope.blockHeight - 160 < offset && $scope.blocks[currentBlockId + 1]) {
                            position = $scope.blockHeight * (currentBlockId + 1);
                        }
                        data.mcs.mCustomScrollbar("scrollTo", position, {callbacks: false, timeout: 0, scrollInertia: 200});
                    }
                });
                $scope.$on('pageScrollBlock', function(e, data){
                    if ($scope.blocks.length > 1) {
                        var offset = Math.abs(data.top) % $scope.blockHeight;
                        var currentBlockId = Math.floor((data.top * (-1)) / $scope.blockHeight);
                        var position = $scope.blockHeight * (data.direction > 0?currentBlockId+1:currentBlockId-1);
                        console.log("POSITION", position);
//                        if (offset < $scope.blockHeight - 160 && offset != 0) {
//                            position = $scope.blockHeight * currentBlockId;
//                        } else if ($scope.blockHeight - 160 < offset && $scope.blocks[currentBlockId + 1]) {
//                            position = $scope.blockHeight * (currentBlockId + 1);
//                        }
                        data.mcs.mCustomScrollbar("scrollTo", position, {callbacks: false, timeout: 0, scrollInertia: 200});
                    }
                });

                $scope.showSocLinks = function(block){
                    if (!block.hasFooter) {
                        block.socLinksClass = ['visible', 'active'];
                        block.follow = true;
                    } else {
                        block.socLinksClass = ['visible'];
                        block.follow = true;
                    }
                };
                $scope.hideSocLinks = function(block) {
                    block.follow = false;
                    block.socLinksClass = ['invisible-height'];
                };
            }
        }
    }]);
}