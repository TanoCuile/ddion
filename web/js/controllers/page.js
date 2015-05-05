function initializePageController(app) {
    app.controller('PageController', ['$scope', 'PageData', 'Menu',function($scope, PageData, Menu) {
        $scope.data = {
            title: 'dDion',
            description: '',
            keywords: "",
            height: PageData.getPageHeight()
        };
        $scope.view = {
            contentContainer : {
                style: {
                    height: $scope.data.height + 'px'
                }
            }
        };
        $scope.menu = Menu();
        angular.forEach($scope.menu, function(item){
            if (item.children) {
                item.subTitleClass = ['invisible-height'];
            }
        });
        $scope.showChildren = function(item){
            if (item.children) {
                item.subTitleClass = ['visible'];
            }
        };
        $scope.hideChildren = function(){
            angular.forEach($scope.menu, function(item){
                if (item.children) {
                    item.subTitleClass = ['invisible-height'];
                }
            });
        };
        PageData.setPageData($scope.data);
        $scope.$on('LoadPageData', function(event, data){
            $scope.data.title = data.title;
            $scope.data.keywords = data.keyworeds;
            $scope.data.description = data.description;
            console.log("PAGE DATA");
        });
        $scope.$on('changeLanguage', function(){
            $scope.menu = Menu();
            $scope.$apply();
        });
        $scope.scrollingDirection = 0;
        $scope.lastPosition = 0;
        $scope.scrollOptions = {
//            mouseWheel: {
//                scrollAmount: (PageData.getPageData().height - PageData.getContentOffset())
//            },
//            keyboard: {
//                scrollAmount: (PageData.getPageData().height - PageData.getContentOffset())/4.5
//            },
            callbacks: {
                onScrollStart: function(e) {
                    $scope.scrollingDirection = 0;
                    $scope.lastPosition = this.mcs.top;
                },
                whileScrolling: function(){
                    $scope.$broadcast('pageScroll', {top: this.mcs.top, mcs: angular.element(this)});
                    return true;
                    var direction = 0;
                    if ($scope.lastPosition - this.mcs.top > 0) {
                        direction = 1;
                    } else {
                        direction = 0;
                    }
                    $scope.lastPosition = this.mcs.top;
                    $scope.$broadcast('pageScrollBlock', {top: this.mcs.top, direction: direction, mcs: angular.element(this)});
                },
                onScroll: function() {
                    $scope.$broadcast('pageScrollFinished', {top: this.mcs.top, mcs: angular.element(this)});
                }
                /*
                 onScrollStart: function(e) {
                 $scope.scrollingDirection = 0;
                 $scope.lastPosition = this.mcs.top;
                 },
                 whileScrolling: function(){
                 $scope.$broadcast('pageScroll', {top: this.mcs.top, mcs: angular.element(this)});
                 },
                 onScroll: function() {
                 $scope.$broadcast('pageScrollFinished', {top: this.mcs.top, mcs: angular.element(this)});
                 }
                 */
            }
        };
    }]);
}