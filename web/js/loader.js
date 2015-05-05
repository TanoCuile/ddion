requirejs.config({
    baseUrl: 'js',
    paths: {
        angular: '../lib/angular',
        animate: '../lib/animate',
        bootstrap: '../lib/bootstrap',
        jquery: '../lib/jquery',
        scroll: '../lib/jquery/scroll',
        youtube: '../lib/jquery/youtube/youTubeEmbed',
        swfobject: '../lib/swfobject',
        controllers: './controllers',
        directives: './directives',
        providers: './providers',
        block: './providers/blocks'
    },
    shim: {
        angular: {
            exports: 'angular/angular'
        },
        'tween': {
            exports: 'animate/tween'
        }
    },
    deps: ['preloader']
});

requirejs(['preloader']);