<div ng-class="block.view.class" class="info-block contact-block" id="{[block.getData().id]}">
    <div class="bg">
        <img ng-src="{[block.slider.currentSlide]}" ng-class="block.slider.currentSlideClass" />
        <img style="width: 0; height: 0;" ng-if="block.slider.nextSlide" ng-src="{[block.slider.nextSlide]}" />
    </div>
    <div class="content">
        <div class="block-title" ng-class="block.view.titleClass">
            <h1>{[ block.getData().title ]}</h1>
            <div ng-if="block.getData().subTitle">
                <hr/>
                <div>
                    <i class="glyphicon glyphicon-triangle-right"></i>
                    <a href="#" class="sub-title" ng-click="block.toggleContent();">{[ block.getData().subTitle ]}</a>
                    <a href="#" class="sub-title-active"
                       ng-click="block.toggleContent();">{[ block.getData().subTitleActive ]}</a>
                </div>
            </div>
        </div>
        <div class="contact-data" ng-class="block.view.contactDataClass">
            <div style="width: 50%; float: left; position: relative;">
                <form class="contacts left" style="position: relative">
                    <div class="contact-input">
                        <div class="name">
                            <input type="text" ng-model="block.contact.name"/>
                        </div>
                        <div class="email">
                            <input type="email" ng-model="block.contact.email"/>
                        </div>
                        <div class="cl-b"></div>
                    </div>
                    <div class="message">
                        <textarea ng-model="block.contact.message"></textarea>
                    </div>
                    <div class="actions">
                        <input type="submit" ng-click="block.contactUs()">
                    </div>
                </form>
            </div>
            <div style="width: 50%; float: left; position: relative;">
                <div class="contacts-controls" ng-class="block.view.contactDataClass">
                    <h2 class="phone">{[ block.getData().phone ]}</h2>
                </div>
            </div>
            <div class="cl-b"></div>
        </div>
    </div>
</div>