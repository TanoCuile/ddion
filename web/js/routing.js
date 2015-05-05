function initializeRouting(app) {
    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
//            controller: 'ContentController',
            templateUrl: '/html/pages/home.html.tpl'
        });
        $routeProvider.when('/news', {
//            controller: 'ContentController',
            templateUrl: '/html/pages/news.html.tpl'
        });
        $routeProvider.when('/contact', {
//            controller: 'ContentController',
            templateUrl: '/html/pages/contact.html.tpl'
        });
        $routeProvider.when('/lab', {
            controller: 'LabController',
            templateUrl: '/html/pages/biomimetic.html.tpl'
        });
        $routeProvider.when('/project', {
//            controller: 'ProjectController',
            templateUrl: '/html/pages/projects.html.tpl'
        });
        $routeProvider.when('/project/:projectId', {
            controller: 'ProjectController',
            templateUrl: '/html/pages/project.html.tpl'
        });
        $routeProvider.when('/and-you', {
//            controller: 'ContentController',
            templateUrl: '/html/pages/and_you.html.tpl'
        });
        $routeProvider.when('/inside', {
//            controller: 'ContentController',
            templateUrl: '/html/pages/inside.html.tpl'
        });
        $routeProvider.otherwise({
//            controller: 'ContentController',
            templateUrl: '/html/pages/home.html.tpl'
        });
        $locationProvider.html5Mode(true);
    }]);

    app.factory('Menu', ['i18n', function (i18n) {
        return function () {
            return [
                {
                    id: 1,
                    title: i18n.getLabel("dDION INSIDE"),
                    href: "/inside",
                    children: [
                        {
                            title: i18n.getLabel('history'),
                            href: '/inside/history'
                        }
                    ]
                },
                {
                    id: 2,
                    title: i18n.getLabel("dDION NEWS"),
                    href: "/news",
                    children: [
                        {
                            title: i18n.getLabel('project'),
                            href: '/news/project'
                        },
                        {
                            title: i18n.getLabel('video'),
                            href: '/news/video'
                        },
                        {
                            title: i18n.getLabel('media'),
                            href: '/news/media'
                        }
                    ]
                },
                {
                    id: 3,
                    title: i18n.getLabel("LAB"),
                    href: "/lab",
                    children: [
                        {
                            title: i18n.getLabel('concept'),
                            href: "/lab/concept"
                        },
                        {
                            title: i18n.getLabel('prototyping'),
                            href: "/lab/prototyping"
                        }
                    ]
                },
                {
                    id: 4,
                    title: i18n.getLabel("PROJECT"),
                    href: "/project",
                    children: [
                        {
                            title: i18n.getLabel('subject'),
                            href: '/project/subject'
                        },
                        {
                            title: i18n.getLabel('interior'),
                            href: '/project/interior'
                        },
                        {
                            title: i18n.getLabel('space'),
                            href: '/project/space'
                        },
                        {
                            title: i18n.getLabel('architecture'),
                            href: '/project/architecture'
                        }
                    ]
                },
                {
                    id: 5,
                    title: i18n.getLabel('dDION and YOU'),
                    href: '/and-you',
                    children: [
                        {
                            title: i18n.getLabel('career'),
                            href: '/and-you/career'
                        },
                        {
                            title: i18n.getLabel('legal information'),
                            href: '/and-you/legal-information'
                        },
                        {
                            title: i18n.getLabel('privacy policy'),
                            href: '/and-you/privacy-policy'
                        }
                    ]
                },
                {
                    id: 6,
                    title: i18n.getLabel("CONTACT"),
                    href: "/contact",
                    children: [
                        {
                            title: i18n.getLabel("office"),
                            href: "/contact/office"
                        },
                        {
                            title: i18n.getLabel('press'),
                            href: '/contact/press'
                        },
                        {
                            title: i18n.getLabel('following'),
                            href: '/contact/following'
                        }
                    ]
                }
            ]
        };
    }]);
}