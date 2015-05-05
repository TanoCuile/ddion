function initializeSliderBlock(app) {
    app.provider('SliderBlock', [function(){
        return {
            $get: ['InfoBlock', function(InfoBlock){
                SliderBlock.prototype = angular.extend({}, InfoBlock.prototype, SliderBlock.prototype);
                return SliderBlock;
            }]
        }
    }]);
    app.run(['BlockManager', 'SliderBlock',function(BlockManager, SliderBlock){
        BlockManager.addBlockType('slider', SliderBlock);
    }]);
}

var RomanNumbers = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII'];

function SliderBlock(blockData) {
    this.initializeData(blockData);
    this.templateUrl = '/html/blocks/slider.html.tpl';
    this.footer = {
        tpl: '/html/blocks/slider_footer.html.tpl'
    };
    this.initializeSlider();
};

SliderBlock.prototype.initializeSlider = function(){
    angular.forEach(this.getData().slides, function(slide, key){
        slide.class = ['invisible'];
        slide.index = key + 1;
        slide.number = RomanNumbers[key];
        slide.preview = false;
        slide.image = false;
    });
    this.currentSlide = null;
    this.setCurrentSlide(0);
    this.activateSepta(0);
};

SliderBlock.prototype.showPreview = function(slide) {
    slide.preview = slide.previewUri;
};

SliderBlock.prototype.setCurrentSlide = function(index, autoSlide){
    var entity = this;
    if (index+1 > this.getData().slides.length) {
        index = index - this.getData().slides.length;
    }
    this.currentSlideIndex = index;
    if (this.currentSlide) {
        this.currentSlide.class = ['invisible'];
    }
    if (entity.$apply && autoSlide) {
        entity.$apply();
    }
    setTimeout(function () {
        entity.getData().slides[entity.currentSlideIndex].class = ['invisible'];
        entity.currentSlide = entity.getData().slides[entity.currentSlideIndex];
        entity.currentSlide.class = ['visible'];
        if (entity.autoSlide) {
            clearTimeout(entity.autoSlide);
        }
        entity.autoSlide = setTimeout(function(){
            entity.slideNext(true);
        }, 10000);
        entity.$apply();
    }, 500);
};

SliderBlock.prototype.slideTo = function(slide) {
    this.setCurrentSlide(slide.index - 1);
};

SliderBlock.prototype.slideNext = function(autoSlide){
    this.setCurrentSlide(this.currentSlideIndex + 1, autoSlide);
};

SliderBlock.prototype.slidePrev = function(){
    this.setCurrentSlide(this.currentSlideIndex - 1);
};

SliderBlock.prototype.activateSepta = function(id){
    var slides = this.getData().slides;
    var perSepta = 6;
    var totalSepts = Math.floor(slides.length / perSepta);
    if (totalSepts >= id) {
        this.currentSepta = id;
    }
    if (this.currentSepta + 1 >= totalSepts) {
        this.isNextSepta = false;
    } else {
        this.isNextSepta = true;
    }
    if (this.currentSepta <= 0) {
        this.isPrevSepta = false;
    } else {
        this.isPrevSepta = true;
    }
    for (var i = 0; i < slides.length; ++i) {
        if (i >= this.currentSepta * perSepta && i < (this.currentSepta + 1 > totalSepts?totalSepts:this.currentSepta + 1)*perSepta) {
            slides[i].showPreview = true;
        } else {
            slides[i].showPreview = false;
        }
    }
};

SliderBlock.prototype.nextSepta = function() {
    if (this.isNextSepta) {
        this.activateSepta(this.currentSepta + 1);
    }
};

SliderBlock.prototype.prevSepta = function() {
    if (this.isPrevSepta) {
        this.activateSepta(this.currentSepta - 1);
    }
};