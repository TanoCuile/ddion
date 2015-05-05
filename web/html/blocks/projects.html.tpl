<div ng-class="block.view.class" class="info-block projects-block" id="{[block.getData().id]}">
    <div class="bg">
        <img ng-src="{[block.slider.currentSlide]}" ng-class="block.slider.currentSlideClass" />
    </div>
    <div class="content">
        <div class="concept" ng-repeat="concept in block.getData().concepts" ng-class="concept.class" ng-mouseenter="block.activateConcept(concept)">
            <h4><a ng-href="{[block.getProjectUrl(concept)]}">{[ concept.title ]}</a></h4>
        </div>
    </div>
</div>