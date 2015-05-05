function initializeScenariumBLock (app) {
    app.provider('ScenariumBlock', [function(){
        return {
            $get: ['InfoBlock', function(InfoBlock){
                LogoBlock.prototype = angular.extend({}, InfoBlock.prototype, ScenariumBlock.prototype);
                return LogoBlock;
            }]
        }
    }]);
    app.run(['BlockManager', 'ScenariumBlock',function(BlockManager, ScenariumBlock){
        BlockManager.addBlockType('scenarium', ScenariumBlock);
    }]);
}

function ScenariumBlock(){
}