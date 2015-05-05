<div class="slider-controls">
    <div class="prev" ng-if="block.isPrevSepta">
        <a href="#" ng-click="block.prevSepta()"><i class="glyphicon glyphicon-menu-left"></i></a>
    </div>
    <div class="slide-preview" ng-repeat="slide in block.getData().slides" ng-click="block.slideTo(slide)" ng-class="{'invisible-zero': !slide.showPreview}" ng-mouseenter="block.showPreview(slide)">
        <div class="slide-thumbnail" ng-if="slide.preview">
            <img ng-src="{[ slide.preview ]}" width="100" height="70">
        </div>
        <div ng-if="!slide.preview" class="slide-id"><a href="#">{[slide.number]}</a></div>
    </div>
    <div class="next" ng-if="block.isNextSepta">
        <a href="#" ng-click="block.nextSepta()"><i class="glyphicon glyphicon-menu-right"></i></a>
    </div>
    <div class="cl-b"></div>
</div>