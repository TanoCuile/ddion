function initializePageDataProvider(app) {
    app.provider('PageData', [function(){
        var PageData = {};
        var contentOffset = 244;
        return {
            $get: ['$document', function($document) {
                return {
                    getPageData: function() {
                        return PageData;
                    },
                    setPageData: function(pageData){
                        PageData = pageData;
                    },
                    getContentOffset: function() {
                        return contentOffset;
                    },
                    setContentOffset: function(newContentOffset){
                        contentOffset = newContentOffset;
                    },
                    getPageHeight: function(){
                        return Math.max(
                            $document[0].body.scrollHeight, $document[0].documentElement.scrollHeight,
                            $document[0].body.offsetHeight, $document[0].documentElement.offsetHeight,
                            $document[0].body.clientHeight, $document[0].documentElement.clientHeight
                        );
                    }
                };
            }]
        }
    }]);
}