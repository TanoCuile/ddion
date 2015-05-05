<?php
header('Content-Type', 'text/html; charset=UTF-8');
?>
<!DOCTYPE html>
<html ng-controller="PageController">
<head>
    <title>dDion</title>
    <link type="text/css" rel="stylesheet" href="/lib/animate/animate.css"/>
    <link type="text/css" rel="stylesheet" href="/lib/jquery/scroll/jquery.mCustomScrollbar.css"/>
    <link href="/css/style.css" type="text/css" rel="stylesheet"/>
    <link type="text/css" rel="stylesheet" href="/lib/jquery/youtube/youTubeEmbed/youTubeEmbed-jquery-1.0.css"/>
    <!--<link type="text/css" rel="stylesheet" href="/lib/font-awesome/css/font-awesome.css"/>-->
    <base href="/">
    <meta charset="utf-8" />
</head>
<body>
<div id="page" class="unprepared-header" style="height: 100%; overflow: hidden; position: relative; width: 100%;" ng-style="view.contentContainer.style"
     ng-scrollbars
     ng-scrollbars-config="scrollOptions">
    <header class="container-fluid">
        <div class="logo-line row">
            <a href="/"><img src="/img/logo.png" height="80"></a>
        </div>
        <div class="menu-line" ng-mouseleave="hideChildren()">
            <div class="main-menu row clearfix">
                <div class="item col-md-4" id="menu-item-{[item.id]}" ng-repeat="item in menu">
                    <div class="inner">
                        <a class="white" ng-href="{[item.href]}" ng-mouseenter="showChildren(item)">{[item.title]}</a>
                        <div>
                            <ul ng-if="item.children" ng-class="item.subTitleClass">
                                <li ng-repeat="child in item.children">
                                    <a class="white" ng-href="{[child.href]}">{[child.title]}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <div id="content" style="position:relative; top: 0; padding-top: 105px;">
        <div class="content-wrapper" ng-view="">

        </div>
    </div>
    <footer>

    </footer>

</div>
<div id="preloader" style="">
    <div id="preloader-logo" class="logo" style="">
        <div id="logo-animation-container" class="animation-container" style="top: 50%;margin-top: -75px;height: 150px;width: 41px;">
            <svg id="preloader-image" style="width: 41px; height: 150px;" viewbox="0 0 83 299">
                <style>
                    path {
                        stroke: #fff;
                    }

                    polygon {
                        fill: #fff;
                    }
                </style>
                <g id="layer1">
                    <path d="m 0.00294371,-0.10745003 77.30511529,0 c 2.413565,0 4.388045,1.91679183 4.388045,4.25606973 l 0,282.7620003 c 0,2.34115 -1.97448,4.2561 -4.388045,4.2561 l -32.647839,0 0,-1.22486 31.903261,0 c 2.224855,0 4.045186,-1.77222 4.045186,-3.937 l 0,-281.1301373 c 0,-2.1652226 -1.822202,-3.9369827 -4.045186,-3.9369827 l -76.56053729,0 0,-1.04519003 z"/>
                    <polygon points="12.9113,108.754 12.9113,170.165 12.5511,170.165 12.5511,108.754 "
                             transform="matrix(4.6711164,0,0,4.6785469,-33.014844,-504.98823)"/>
                    <path d="m 25.612807,183.16525 -21.1802435,0 c -2.4135657,0 -4.38804685,1.9154 -4.38804685,4.25609 l 0,34.21657 0,11.65985 0,59.95042 c 0,2.31448 1.97494815,4.25654 4.38804685,4.25606 l 77.4480685,-0.4276 -0.02896,-1.01633 -76.6765426,0.39861 c -2.1982272,0 -4.0447196,-1.77129 -4.0447196,-3.93652 l 0,-59.22432 0,-11.65987 0,-33.49043 c 0,-2.16522 1.819867,-3.93655 4.0447196,-3.93655 l 20.4361356,0 0,-1.04563 z"/>
                    <polygon points="16.6209,108.754 16.6209,170.171 14.6116,170.171 14.6116,108.754 "
                             transform="matrix(4.6711164,0,0,4.6785469,-33.014844,-504.98823)"/>
                </g>
            </svg>
            <div id="animation-controls" class="animation-controls" style="position: absolute; top: 0; left: 0;">
                <div class="animation-control" id="horizontal-first"
                     style="width: 41px; height: 2px; top: 0; left: 0px;"></div>
                <div class="animation-control" id="horizontal-second"
                     style="width: 13px; height: 3px; top: 90px;"></div>
                <div class="animation-control" id="horizontal-third"
                     style="width: 19px; height: 3px; top: 143px; left: 22px;"></div>
                <div class="animation-control" id="horizontal-fourth"
                     style="width: 41px; height: 4px; top: 146px; left:0px;"></div>
                <div class="animation-control" id="vertical-first"
                     style="height: 58px; width: 2px; top: 91px; left: 0px;"></div>
                <div class="animation-control" id="vertical-second"
                     style="height: 145px; width: 2px; left: 39px; top: 0px;"></div>
                <div class="animation-control" id="bliming-first"
                     style="height: 144px; width: 2px; left: 12px; top: 2px;"></div>
                <div class="animation-control" id="bliming-second"
                     style="height: 144px; width: 6px; left: 17px; top: 2px;"></div>
            </div>
            <div class="choose-language invisible">
                <a href="#" class="white" id="set-lang-en">EN</a>
                <a href="#" class="white" id="set-lang-ru">RU</a>
            </div>
        </div>
    </div>
</div>
<div id="preloader-footer-line"
     style="background-color: #fff; border-top: #000 solid 5px; width: 100%; z-index: 12; position: absolute; bottom: 0;">

</div>
<script type="text/javascript" src="/lib/animate/tween.min.js"></script>
<script type="text/javascript" src="/js/preloader.js"></script>
<script type="text/javascript" src="/lib/jquery/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="/lib/jquery/jquery.mousewheel.min.js"></script>
<script type="text/javascript" src="/lib/jquery/scroll/jquery.mCustomScrollbar.concat.min.js"></script>
<script type="text/javascript" src="/lib/swfobject/swfobject.js"></script>
<script type="text/javascript" src="/lib/jquery/youtube/youTubeEmbed/jquery.swfobject.1-1-1.min.js"></script>
<script type="text/javascript" src="/lib/jquery/youtube/youTubeEmbed/youTubeEmbed-jquery-1.0.js"></script>
<script type="text/javascript" src="/lib/angular/angular.js"></script>
<script type="text/javascript" src="/lib/angular/angular-touch.js"></script>
<script type="text/javascript" src="/lib/angular/angular-animate.js"></script>
<script type="text/javascript" src="/lib/angular/angular-route.js"></script>
<script type="text/javascript" src="/lib/angular/angular-sanitize.js"></script>
<script type="text/javascript" src="/lib/angular/scroll/scrollbars.min.js"></script>
<script type="text/javascript" src="/js/routing.js"></script>
<script type="text/javascript" src="/js/i18n.js"></script>
<script type="text/javascript" src="/js/mock_loader.js"></script>
<script type="text/javascript" src="/js/providers/page_data.provider.js"></script>
<script type="text/javascript" src="/js/providers/project.provider.js"></script>
<script type="text/javascript" src="/js/providers/block.provider.js"></script>
<script type="text/javascript" src="/js/providers/blocks/info.js"></script>
<script type="text/javascript" src="/js/providers/blocks/contact.js"></script>
<script type="text/javascript" src="/js/providers/blocks/scenarium.js"></script>
<script type="text/javascript" src="/js/providers/blocks/news.js"></script>
<script type="text/javascript" src="/js/providers/blocks/slider.js"></script>
<script type="text/javascript" src="/js/providers/blocks/logo.js"></script>
<script type="text/javascript" src="/js/providers/blocks/projects.js"></script>
<script type="text/javascript" src="/js/providers/blocks/photo.js"></script>
<script type="text/javascript" src="/js/providers/blocks/video.js"></script>
<script type="text/javascript" src="/js/directives/info_block.js"></script>
<script type="text/javascript" src="/js/directives/block_list.js"></script>
<script type="text/javascript" src="/js/directives/footer.js"></script>
<script type="text/javascript" src="/js/directives/yt-video.js"></script>
<script type="text/javascript" src="/js/controllers/page.js"></script>
<script type="text/javascript" src="/js/controllers/content.js"></script>
<script type="text/javascript" src="/js/controllers/lab.js"></script>
<script type="text/javascript" src="/js/controllers/project.js"></script>
<script type="text/javascript" src="/js/app.js"></script>
</body>
</html>