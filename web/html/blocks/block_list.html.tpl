<div ng-repeat="(blockId,data) in blocks" ng-style="data.blockStyle" class="block-wrapper" ng-class="{'active':!data.isActive()}">
    <info-block block-id="blockId" blocks="blocks">

    </info-block>
    <div class="soc-links row" ng-class="{'height': data.follow}" ng-mouseleave="hideSocLinks(data)"
         ng-mouseenter="showSocLinks(data)">
        <div class="trigger"></div>
        <ul ng-class="data.socLinksClass" class="col-md-offset-6 col-md-12 clearfix">
            <li class="col-md-6">Follow</li>
            <li class="col-md-6"><a href="http://vimeo.com" class="white" target="_blank"><i class="fa fa-vimeo-square"></i>VIMEO</a></li>
            <li class="col-md-6"><a href="http://google.com" class="white" target="_blank"><i class="fa fa-google-plus-square"></i>GOOGLE</a></li>
            <li class="col-md-6"><a href="http://facebook.com" class="white" target="_blank"><i class="fa fa-facebook-square"></i>FACEBOOK</a></li>
        </ul>
    </div>
</div>