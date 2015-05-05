function initializeInfoBlock(app) {
    app.provider('InfoBlock', [function(){
        return {
            $get: ['$location', function($location){
                InfoBlock.prototype.moveForward = function() {
                    if (this.getData().href) {
                        $location.path(this.getData().href);
                    }
                };
                return InfoBlock;
            }]
        }
    }]);
    app.run(['BlockManager', 'InfoBlock',function(BlockManager, InfoBlock){
        BlockManager.addBlockType('info', InfoBlock);
    }]);
}

function InfoBlock(blockData) {
    this.initializeData(blockData);
    this.getSlider().initialize();
    this.initializeInfoView();
}

InfoBlock.prototype.initializeInfoView = function() {
    this.view.dataClass = [
        (this.getData().position ? this.getData().position : 'bottom-left')
    ];
    this.view.titleClass = [
    ];
};

InfoBlock.prototype.initializeData = function(blockData) {
    var data = blockData;
//    data.entity = this;
    this.getData = function() {
        return data;
    };
    this.view = {
        'class': [(data.class?data.class:'default')]
    };
};

InfoBlock.prototype.templateUrl = '/html/blocks/info.html.tpl';
InfoBlock.prototype.isActive = function() {
    return this.view.class.indexOf('active-block') < 0;
};
InfoBlock.prototype.activate = function(){
    if (this.isActive()) {
        this.view.class.push('active-block');
    }
};
InfoBlock.prototype.disactivate = function(){
    if (this.view.class.indexOf('active-block') >= 0) {
        this.view.class.splice(this.view.class.indexOf('active-block'), 1);
    }
};


InfoBlock.prototype.getSlider = function(){
    if (!this.slider) {
        this.slider = new this.Slider(this);
    }
    return this.slider;
};

InfoBlock.prototype.Slider = function(block) {
    this.block = block;
};

InfoBlock.prototype.Slider.prototype.initialize = function(){
    var data = this.block.getData();
    if (data.bg.length > 1) {
        this.currentSlideIndex = Math.floor(Math.random() * data.bg.length);
        this.currentSlide = data.bg[this.currentSlideIndex].uri;
        this.initNextSlide();
        setTimeout(function(){
            this.slideBg();
        }.bind(this),4000);
    } else {
        this.currentSlideIndex = 0;
        this.currentSlide = data.bg[this.currentSlideIndex].uri;
    }
};

InfoBlock.prototype.Slider.prototype.getNextSlide = function(){
    var data = this.block.getData();
    if (this.currentSlideIndex == data.bg.length - 1) {
        return 0;
    } else {
        return this.currentSlideIndex + 1;
    }
};

InfoBlock.prototype.Slider.prototype.slideBg = function(autoSlideDisable) {
//    var data = this.block.getData();
//    this.currentSlideClass = ['invisible'];
//    this.block.$apply();
//    setTimeout(function(){
//        this.currentSlide = this.nextSlide;
//        this.currentSlideClass = ['visible'];
//        this.currentSlideIndex = this.nextSlideIndex;
//        this.initNextSlide();
//        this.block.$apply();
//        setTimeout(function(){
//            this.slideBg();
//        }.bind(this), 4000);
//    }.bind(this), 300);
console.log("ASD", !autoSlideDisable);
    this.resetSlide(this.nextSlide, function(){
        this.currentSlideIndex = this.nextSlideIndex;
        this.initNextSlide();
    }, !autoSlideDisable);
};

InfoBlock.prototype.Slider.prototype.resetSlide = function(newUri, onReset, slideNext){
    this.currentSlideClass = ['invisible'];
    if (this.autoSlide){
        clearTimeout(this.autoSlide);
    }
    if (this.block.$apply) {
        this.block.$apply();
    }
    setTimeout(function(){
        this.currentSlide = newUri;
        this.currentSlideClass = ['visible'];
        if (onReset) {
            onReset.call(this);
        }
        if (this.block.$apply) {
            this.block.$apply();
        }
        if (slideNext) {
            this.autoSlide = setTimeout(function(){
                console.log("AUTOSLIDE");
                this.slideBg();
            }.bind(this), 4000);
        }
    }.bind(this), 500);
};

InfoBlock.prototype.Slider.prototype.initNextSlide = function(){
    var data = this.block.getData();
    this.nextSlideIndex = this.getNextSlide();
    var slider = this;
    setTimeout(function(){
        slider.nextSlide = data.bg[slider.nextSlideIndex].uri;
    }, 0);
};