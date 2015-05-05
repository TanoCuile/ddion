<div ng-class="block.view.class" class="info-block logo-block" id="{[block.getData().id]}">
    <div class="bg">
        <img ng-src="{[block.slider.currentSlide]}" ng-class="block.slider.currentSlideClass" />
        <img style="width: 0; height: 0;" ng-if="block.slider.nextSlide" ng-src="{[block.slider.nextSlide]}" />
    </div>
    <div class="content">
        <img ng-src="{[block.getData().logo.uri]}">
    </div>
</div>