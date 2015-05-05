function initializeBlockProvider(app) {
    app.provider('BlockManager', [function () {
        var blockTypes = {};
        var blocksList = [];
        return {
            $get: ['$http', function($http){
                return {
                    addBlockType: function(name, blockType){
                        blockTypes[name] = blockType;
                    },
                    getBlock: function(name){
                        return blockTypes[name];
                    },
                    loadPageData: function(pageId, callback){
                        $http.get(pageId).success(callback);
                    },
                    getTemplateFromData: function(block, $templateCache, callback) {
                        $http.get(block.templateUrl, {cache: $templateCache}).success(callback);
                    },
                    hasFooter: function (block) {
                        var withFooterTypes = ['slider', 'photo', 'video'];
                        if (block.type && withFooterTypes.indexOf(block.type) >= 0) {
                            return true;
                        }
                        return block.footer && block.footer.tpl;
                    },
                    setBlockList: function(blocks){
                        blocksList = blocks;
                        return this;
                    },
                    getBlockList: function(){
                        return blocksList;
                    },
                    getFooterTemplate: function(block, $templateCache, callback){
                        if (this.hasFooter(block)) {
                            $http.get(block.footer.tpl, {cache: $templateCache}).success(callback);
                        }
                    }
                }
            }]
        }
    }]);
}