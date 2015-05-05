(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
            || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());

(function () {
    function getHeight() {
        return Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
    }

    function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
    }

    function getProperty(prop) {
        if (prop) {
            return parseInt(prop.substr(0, prop.length - 2));
        }
        return 0;
    }

    function getPercentProperty(prop) {
        if (prop) {
            return parseInt(prop.substr(0, prop.length - 1));
        }

        return 0;
    }

    var scenarium = {
        controls: {
            preloaderEl: document.getElementById('preloader'),
            preloaderLineEl: document.getElementById('preloader-footer-line'),
            preloaderImage: document.getElementById('preloader-image'),
            preloaderAnimationContainer: document.getElementById('logo-animation-container'),
            hFirst: document.getElementById('horizontal-first'),
            hSecond: document.getElementById('horizontal-second'),
            hThird: document.getElementById('horizontal-third'),
            hFourth: document.getElementById('horizontal-fourth'),
            vFirst: document.getElementById('vertical-first'),
            vSecond: document.getElementById('vertical-second'),
            bFirst: document.getElementById('bliming-first'),
            bSecond: document.getElementById('bliming-second'),
            baseAnimationSteps: 1000,
            linkBliking: false
        },
        steps: [
            {
                callbacks: [
                    'firstStep'
                ]
            },
            {
                callbacks: [
                    'hFirstMove',
                    'hSecondMove'
                ]
            },
            {
                callbacks: [
                    'vFirstMove',
                    'vSecondMove'
                ]
            },
            {
                callbacks: [
                    'hThirdMove',
                    'hFourthMove',
                    'prepareApp'
                ]
            },
            {
                callbacks: [
                    'showLanguage'
                ]
            },
            {
                callbacks: [
                    'showContent'
                ]
            },
            {
                callbacks: [
                    'firstStep'
                ]
            }
        ],
        currentStep: 0,
        move: function () {
            if (!this.steps[this.currentStep]) {
                return false;
            }
            var currentStepData = this.steps[this.currentStep];
            for (var i = 0; i < currentStepData.callbacks.length; ++i) {
                scenarium[currentStepData.callbacks[i]].call(scenarium, currentStepData);
            }
            this.currentStep++;
        },
        initialize: function () {
            this.controls.height = getHeight();
            this.controls.preloaderEl.style.height = this.controls.height + 'px';
            animate();
            this.move();
        }
    };
    scenarium.firstStep = function() {
        var times = 0;
        var opacity = {o: 100};
        console.log("STEPS", scenarium.controls.baseAnimationSteps);
        var hide = new TWEEN.Tween(opacity).to({o: 0}, scenarium.controls.baseAnimationSteps)
            .onUpdate(function () {
                scenarium.controls.bFirst.style.opacity = opacity.o / 100;
                scenarium.controls.bSecond.style.opacity = opacity.o / 100;
            }).onComplete(function () {
                ++times;
                if (times > 2) {
                    scenarium.move();
                } else {
                    show.start();
                }
            });
        var show = new TWEEN.Tween(opacity).to({o: 100}, scenarium.controls.baseAnimationSteps)
            .onUpdate(function () {
                scenarium.controls.bFirst.style.opacity = opacity.o / 100;
                scenarium.controls.bSecond.style.opacity = opacity.o / 100;
            }).onComplete(function () {
                hide.start();
            });
        hide.start();
    };

    scenarium.hFirstMove = function() {
        var style = {width: parseInt(scenarium.controls.hFirst.style.width.substr(0, scenarium.controls.hFirst.style.width.length - 2)), left: 0};
        var open = new TWEEN.Tween(style).to({width: 0, left: style.width}, scenarium.controls.baseAnimationSteps)
            .onUpdate(function () {
                scenarium.controls.hFirst.style.width = style.width + 'px';
                scenarium.controls.hFirst.style.left = style.left + 'px';
            }).onComplete(function () {
                open.stop();
                scenarium.move();
            });
        open.start();
    };

    scenarium.hSecondMove = function() {
        var style = {width: parseInt(scenarium.controls.hSecond.style.width.substr(0, scenarium.controls.hSecond.style.width.length - 2))};
        var open = new TWEEN.Tween(style).to({width: 0}, scenarium.controls.baseAnimationSteps)
            .onUpdate(function () {
                scenarium.controls.hSecond.style.width = style.width + 'px';
            }).onComplete(function () {
                open.stop();
            });
        open.start();
    };

    scenarium.hThirdMove = function() {
        var style = {width: parseInt(scenarium.controls.hThird.style.width.substr(0, scenarium.controls.hThird.style.width.length - 2))};
        var open = new TWEEN.Tween(style).to({width: 0}, scenarium.controls.baseAnimationSteps)
            .onUpdate(function () {
                scenarium.controls.hThird.style.width = style.width + 'px';
            }).onComplete(function () {
                open.stop();
                $('#animation-controls').remove();
                scenarium.move();
            });
        open.start();
    };

    scenarium.hFourthMove = function() {
        var style = {width: getProperty(scenarium.controls.hFourth.style.width), left: getProperty(scenarium.controls.hFourth.style.left)};
        var open = new TWEEN.Tween(style).to({width: 0, left: style.width}, scenarium.controls.baseAnimationSteps)
            .onUpdate(function () {
                scenarium.controls.hFourth.style.width = style.width + 'px';
                scenarium.controls.hFourth.style.left = style.left + 'px';
            }).onComplete(function () {
                open.stop();
            });
        open.start();
    };

    scenarium.vFirstMove = function() {
        var prop = scenarium.controls.vFirst.style.height;
        var style = {height: getProperty(prop), top: getProperty(scenarium.controls.vFirst.style.top)};
        var open = new TWEEN.Tween(style).to({height: 0, top: style.height + style.top}, scenarium.controls.baseAnimationSteps)
            .onUpdate(function () {
                scenarium.controls.vFirst.style.height = style.height + 'px';
                scenarium.controls.vFirst.style.top = (style.top) + 'px';
            }).onComplete(function () {
                open.stop();
                scenarium.move();
            });
        open.start();
    };

    scenarium.vSecondMove = function() {
        var prop = scenarium.controls.vSecond.style.height;
        var style = {height: getProperty(prop), top: getProperty(scenarium.controls.vSecond.style.top)};
        var open = new TWEEN.Tween(style).to({height: 0, top: style.height + style.top}, scenarium.controls.baseAnimationSteps)
            .onUpdate(function () {
                scenarium.controls.vSecond.style.height = style.height + 'px';
                scenarium.controls.vSecond.style.top = (style.top) + 'px';
            }).onComplete(function () {
                open.stop();
            });
        open.start();
    };

    scenarium.showLanguage = function(stepData) {
        var lang = $('.choose-language');
        lang.addClass('visible');
        lang.removeClass('invisible');
        scenarium.callingLink(lang.find('a'));
        $('#set-lang-en').click(function (e) {
            e.preventDefault(true);
            angular.element(document).injector().invoke(['i18n', function (i18n) {
                scenarium.controls.linkBliking = false;
                i18n.setCurrent('en');
                $('.choose-language').removeClass('visible').addClass('invisible');
                scenarium.move();
            }]);
        });
        $('#set-lang-ru').click(function (e) {
            e.preventDefault(true);
            angular.element(document).injector().invoke(['i18n', function (i18n) {
                scenarium.controls.linkBliking = false;
                i18n.setCurrent('ru');
                angular.element(document).scope().$broadcast('changeLanguage');
                $('.choose-language').removeClass('visible').addClass('invisible');
                scenarium.move();
            }]);
        });
    };

    scenarium.prepareApp = function(currentStep) {
        if (angular) {
            initializeApp(angular);
            angular.bootstrap(document, ['app']);
        }
    };

    scenarium.callingLink = function($callingLink) {
        scenarium.controls.linkBliking = true;
        var i = 155;
        var blicking = function () {
            if (!scenarium.controls.linkBliking) {
                return false;
            }
            if (i < 255) {
                $callingLink.each(function () {
                    $(this).css('color', 'rgb(' + i + ',' + i + ',' + i + ')');
                });
            } else {
                if (i > 410) {
                    i = 155;
                } else {
                    $callingLink.each(function () {
                        $(this).css('color', 'rgb(' + (255 - (i - 255)) + ',' + (255 - (i - 255)) + ',' + (255 - (i - 255)) + ')');
                    })
                }
            }
            i += 10;
            setTimeout(blicking, 30);
        };
        setTimeout(blicking, 30);
    };

    scenarium.showContent = function(stepData) {
        $('#page').removeClass('unprepared').addClass('prepared');
        if ($('.logo-block').length > 0) {
            $('.logo-block .bg').addClass('invisible');
            $('.logo-block .content').addClass('invisible');
        }

        var style = {
            preloaderHeight: getProperty(scenarium.controls.preloaderEl.style.height),
            logoHeight: getProperty(scenarium.controls.preloaderImage.style.height),
            logoTop: getPercentProperty(scenarium.controls.preloaderAnimationContainer.style.top),
            logoOffsetTop: getProperty(scenarium.controls.preloaderAnimationContainer.style['margin-top'])
        };
        console.log("TEST", scenarium.controls.preloaderImage);
        var logoHide = new TWEEN.Tween(style).to({preloaderHeight: 80, logoHeight: 70, logoTop: 0, logoOffsetTop: 8}, 4000)
                .onUpdate(function () {
                    scenarium.controls.preloaderEl.style.height = style.preloaderHeight + 'px';
                    scenarium.controls.preloaderAnimationContainer.style.height = style.logoHeight + 'px';                    
                    scenarium.controls.preloaderImage.style.height = style.logoHeight + 'px';
                    scenarium.controls.preloaderAnimationContainer.style.top = style.logoTop + '%';
                    scenarium.controls.preloaderAnimationContainer.style['margin-top'] = style.logoOffsetTop + 'px';
                    scenarium.controls.preloaderLineEl.style.height = (scenarium.controls.height - style.preloaderHeight) + 'px';
                })
                .onComplete(function () {
                    $('#page').removeClass('unprepared-header').addClass('prepared-header');
                    var footerStyle = {
                        height: scenarium.controls.height - style.preloaderHeight
                    };
                    var showFooter = new TWEEN.Tween(footerStyle).to({height: 140}, 4000)
                        .onUpdate(function () {
                            scenarium.controls.preloaderLineEl.style.height = footerStyle.height + 'px';
                        }).onComplete(function () {
                            showFooter.stop();
                            angular.element(document).injector().invoke(['BlockManager', function (BlockManager) {
                                if (BlockManager.getBlockList()[0].getData().type == 'logo') {
                                    var times = 0;
                                    $('.logo-block .content').addClass('visible');
                                    setTimeout(function () {
                                        $('.logo-block .bg').addClass('visible');
                                        setTimeout(nextSlide.bind(BlockManager.getBlockList()[0]), 2000);
                                        function nextSlide() {
                                            if (times < 3) {
                                                this.getSlider().slideBg(true);
                                                setTimeout(nextSlide.bind(this), 2000);
                                            } else {
                                                this.getSlider().slideBg(false);
                                                $(scenarium.controls.preloaderEl).remove();
                                                $(scenarium.controls.preloaderLineEl).addClass('invisible');
                                            }
                                            times++;
                                        }
                                    }, 500);
                                } else {
                                    $('.logo-block .content').addClass('visible');
                                    $(scenarium.controls.preloaderLineEl).addClass('invisible');
                                    $(scenarium.controls.preloaderEl).remove();
                                }
                            }]);
                        });
                    setTimeout(function () {
                        showFooter.start();
                    }, 200);
                })
            ;
        logoHide.start();
    }
    scenarium.initialize();
})();