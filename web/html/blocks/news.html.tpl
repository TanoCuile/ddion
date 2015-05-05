<div ng-class="block.view.class" class="info-block news-block" id="{[block.getData().id]}">
    <div class="bg">
        <img ng-src="{[block.slider.currentSlide]}" ng-class="block.slider.currentSlideClass" />
        <img style="width: 0; height: 0;" ng-if="block.slider.nextSlide" ng-src="{[block.slider.nextSlide]}" />
    </div>
    <div class="content">
        <div class="block-title" ng-class="block.view.titleClass">
            <h1>{[ block.getData().title ]}</h1>
            <hr/>
            <div>
                <i class="glyphicon glyphicon-triangle-right"></i>
                <a href="#" class="sub-title" ng-click="block.toggleContent();">{[ block.getData().subTitle ]}</a>
                <a href="#" class="sub-title-active" ng-click="block.toggleContent();">{[ block.getData().subTitleActive ]}</a>
            </div>
        </div>
        <div class="news-list" ng-class="block.view.newsListClass">
            <div class="article">
                <div ng-repeat="news in block.getData().news" ng-class="news.class">
                    <h2>{[ news.title ]}</h2>
                    <p>{[ news.description ]}</p>
                </div>
                <div class="news-controls" ng-class="block.view.newsListClass">
                    <a href="#" ng-class="{'visible':block.prevNewsSlide, 'invisible': !block.prevNewsSlide}" ng-click="block.newsSliderSlidePrev()">
                        <i class="glyphicon glyphicon-triangle-left"></i>
                        Prev
                    </a>
                    <a href="#" ng-class="{'visible':block.nextNewsSlide, 'invisible': !block.nextNewsSlide}" ng-click="block.newsSliderSlideNext()">
                        Next
                        <i class="glyphicon glyphicon-triangle-right"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>