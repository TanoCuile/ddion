function initializeVideoBlock(app) {
    app.provider('VideoBlock', [function(){
        return {
            $get: ['InfoBlock', function(InfoBlock){
                VideoBlock.prototype = angular.extend({}, InfoBlock.prototype, VideoBlock.prototype);
                return VideoBlock;
            }]
        }
    }]);
    app.run(['BlockManager', 'VideoBlock',function(BlockManager, FormBlock){
        BlockManager.addBlockType('video', FormBlock);
    }]);
}
function VideoBlock(blockData) {
    this.initializeData(blockData);
    this.templateUrl = '/html/blocks/video.html.tpl';
    this.footer = {
        tpl: '/html/blocks/video_footer.html.tpl'
    };
}