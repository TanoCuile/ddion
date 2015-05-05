function initializeNewsBlock(app) {
    app.provider('NewsBlock', [function () {
        return {
            $get: ['InfoBlock', function (InfoBlock) {
                NewsBlock.prototype = angular.extend({}, InfoBlock.prototype, NewsBlock.prototype);
                return NewsBlock;
            }]
        }
    }]);
    app.run(['BlockManager', 'NewsBlock', function (BlockManager, NewsBlock) {
        BlockManager.addBlockType('news', NewsBlock);
    }]);
}

function NewsBlock(blockData) {
    this.initializeData(blockData);
    this.getSlider().initialize();

    this.contactViewInitialize();
};

NewsBlock.prototype.contactViewInitialize = function() {
    this.templateUrl = '/html/blocks/news.html.tpl';
    this.view.newsListClass = [
        (this.getData().showContent ? 'visible' : 'invisible')
    ];
    this.view.titleClass = [
        (this.getData().position ? this.getData().position : 'bottom-left')
    ];
    this.footer = {
    };
    this.newsSliderInitialize();
};

NewsBlock.prototype.newsSliderInitialize = function () {
    angular.forEach(this.getData().news, function (newspaper) {
        newspaper.class = ['invisible-zero'];
    });
    this.currentNewsSlideId = -1;
    this.prevNewsSlide = true;
    this.nextNewsSlide = false;
    this.setNewsSlide(this.getData().news.length - 1);
};
NewsBlock.prototype.setNewsSlide = function (newsId) {
    if (newsId == this.getData().news.length - 1) {
        this.nextNewsSlide = false;
    } else {
        this.nextNewsSlide = true;
    }
    if (newsId == 0) {
        this.prevNewsSlide = false;
    } else {
        this.prevNewsSlide = true;
    }
    var news = this.getData().news;

    if (this.currentNewsSlideId >= 0) {
        news[this.currentNewsSlideId]['class'] = ['invisible-zero'];
    }

    this.currentNewsSlideId = newsId;
    news[this.currentNewsSlideId]['class'] = ['visible'];
};
NewsBlock.prototype.newsSliderSlideNext = function () {
    if (this.currentNewsSlideId != this.getData().news.length - 1) {
        this.setNewsSlide(this.currentNewsSlideId + 1);
    }
};
NewsBlock.prototype.newsSliderSlidePrev = function () {
    if (this.currentNewsSlideId > 0) {
        this.setNewsSlide(this.currentNewsSlideId - 1);
    }
};

NewsBlock.prototype.toggleContent = function () {
    var entity = this;
    var classIndex = entity.view.newsListClass.indexOf('invisible');
    if (classIndex >= 0) {
        if (entity.view.titleClass.indexOf('bottom-left') >= 0) {
            entity.view.titleClass.splice(entity.view.titleClass.indexOf('bottom-left'), 1);
        }
        entity.view.titleClass.push('top-left');
        setTimeout(function(){
            entity.view.newsListClass.splice(classIndex, 1);
            if (entity.view.newsListClass.indexOf('visible') < 0) {
                entity.view.newsListClass.push('visible');
            }
            entity.$apply();
        }, 300);
    } else {
        classIndex = entity.view.newsListClass.indexOf('visible');
        entity.view.newsListClass.splice(classIndex, 1);
        if (entity.view.newsListClass.indexOf('invisible') < 0) {
            entity.view.newsListClass.push('invisible');
        }
        setTimeout(function(){
            if (entity.view.titleClass.indexOf('top-left') >= 0) {
                entity.view.titleClass.splice(entity.view.titleClass.indexOf('top-left'), 1);
            }
            entity.view.titleClass.push('bottom-left');
            entity.$apply();
        }, 500);
    }
};