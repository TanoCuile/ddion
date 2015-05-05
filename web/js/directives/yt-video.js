function initializeYtVideoDirective(app) {
    app.directive('ytVideo', [function(){
        return {
            'template': '<div class="video"></div>',
            scope: {
                'video': '='
            },
            link: function($scope, $el){
                $el.find('.video').youTubeEmbed($scope.video);
            }
        }
    }]);
}