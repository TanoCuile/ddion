function initializeApp(angular) {
    var app = angular.module('app', ['ngTouch', 'ngRoute', 'ngSanitize', 'ngScrollbars']);

    app.config(['$interpolateProvider', function($interpolateProvider){
        $interpolateProvider.endSymbol(']}').startSymbol('{[');
    }]);

    app.config(['ScrollBarsProvider', function(ScrollBarsProvider){
        ScrollBarsProvider.defaults = {
            scrollButtons: {
                enable: false
            },
            axis: 'y',
            autoHideScrollbar: true
        }
    }]);

    window.DdionSystem = {
        app: app
    };

    initializeRouting(app);
    initializeLoader(app);
    initializePageDataProvider(app);
    initializeBlockProvider(app);
    initializePageController(app);
    initializeContentController(app);
    initializeProjectController(app);
    initializeLabController(app);
    initializeInfoBlockDirective(app);
    initializeBlockListDirective(app);
    initializeFooterDirective(app);
    initializeYtVideoDirective(app);
    initializeI18n(app);
    initializeInfoBlock(app);
    initializeContactBlock(app);
    initializeNewsBlock(app);
    initializeSliderBlock(app);
    initializeScenariumBLock(app);
    initializeLogoBlock(app);
    initializeProjectsBlock(app);
    initializePhotoBlock(app);
    initializeVideoBlock(app);
}

//initializeApp(angular);