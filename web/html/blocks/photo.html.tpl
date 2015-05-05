<div ng-class="block.view.class" class="info-block photo-block" id="{[block.getData().id]}">
    <div class="content">
        <div ng-class="{'slide-controls':block.sliderControls}" class="slider">
            <img ng-if="block.currentSlide" ng-class="block.currentSlide.class" ng-src="{[ block.currentSlide.uri ]}">
        </div>
        <div ng-if="block.sliderControls" class="slider-controls" ng-scrollbars>
            <div class="slide-preview"
                 ng-repeat="slide in block.getData().slides" ng-click="block.slideTo(slide)">
                <div class="slide-thumbnail">
                    <img ng-src="{[ slide.preview ]}" height="70">
                </div>
            </div>
        </div>
        <div class="cl-b"></div>
    </div>
</div>