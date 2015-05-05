function initializePhotoBlock(app) {
    app.provider('PhotoBlock', [function(){
        return {
            $get: ['SliderBlock', function(SliderBlock){
                PhotoBlock.prototype = angular.extend({}, SliderBlock.prototype, PhotoBlock.prototype);
                return PhotoBlock;
            }]
        }
    }]);
    app.run(['BlockManager', 'PhotoBlock',function(BlockManager, SliderBlock){
        BlockManager.addBlockType('photo', SliderBlock);
    }]);
}

var RomanNumbers = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII'];

function PhotoBlock(blockData) {
    this.initializeData(blockData);
    this.templateUrl = '/html/blocks/photo.html.tpl';
    this.footer = {
        tpl: '/html/blocks/photo_footer.html.tpl'
    };
    this.initializeSlider();
    this.sliderControls = blockData.slides.length > 1;
};

PhotoBlock.prototype.initializeSlider = function(){
    angular.forEach(this.getData().slides, function(slide, key){
        slide.class = ['invisible'];
        slide.index = key + 1;
        slide.number = RomanNumbers[key];
        slide.preview = slide.previewUri;
        slide.image = false;
    });
    this.currentSlide = null;
    if (this.getData().slides.length > 0) {
        this.sliderControls = true;
    } else {
        this.sliderControls = false;
    }
    this.setCurrentSlide(0);
    this.activateSepta(0);
};