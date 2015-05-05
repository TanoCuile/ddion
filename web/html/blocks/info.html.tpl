<div ng-class="block.view.class" class="info-block" id="{[block.getData().id]}">
    <div class="bg">
        <img ng-src="{[block.slider.currentSlide]}" ng-class="block.slider.currentSlideClass" />
        <img style="width: 0; height: 0;" ng-if="block.slider.nextSlide" ng-src="{[block.slider.nextSlide]}" />
    </div>
    <div class="content row" ng-click="block.moveForward()">
        <div class="data col-md-offset-2 col-md-20" ng-class="block.view.dataClass">
            <div class="title" ng-if="block.getData().title" ng-class="block.view.titleClass">
                <h1>{[block.getData().title]}</h1>
            </div>
            <p>{[ block.getData().data ]}</p>
        </div>
    </div>
</div>