function initializeLogoBlock(app) {
    app.provider('LogoBlock', [function(){
        return {
            $get: ['InfoBlock', function(InfoBlock){
                LogoBlock.prototype = angular.extend({}, InfoBlock.prototype, LogoBlock.prototype);
                return LogoBlock;
            }]
        }
    }]);
    app.run(['BlockManager', 'LogoBlock',function(BlockManager, FormBlock){
        BlockManager.addBlockType('logo', FormBlock);
    }]);
}

function LogoBlock(blockData) {
    this.initializeData(blockData);
    this.getSlider().initialize = function(){
        var data = this.block.getData();
        if (data.bg.length > 1) {
            this.currentSlideIndex = Math.floor(Math.random() * data.bg.length);
            this.currentSlide = data.bg[this.currentSlideIndex].uri;
            this.initNextSlide(true);
            setTimeout(function(){
                this.slideBg(true);
            }.bind(this),4000);
        } else {
            this.currentSlideIndex = 0;
            this.currentSlide = data.bg[this.currentSlideIndex].uri;
        }
    };
    this.getSlider().initialize();
    this.templateUrl = '/html/blocks/logo.html.tpl';
}