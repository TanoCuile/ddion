function initializeLoader(app) {
    app.factory('Loader', ['$http', function($http){
        var map = {
            home_page: '/api/pages/home.json',
            contact_page: '/api/pages/contact.json',
            news_list_page: '/api/pages/news.json',
            and_you_page: '/api/pages/and_you.json',
            inside_page: '/api/pages/inside.json',
            mail_it: '/mailit.php',
            lab: '/api/pages/lab.json',
            project: '/api/pages/project.json',
            projects_page: '/api/pages/projects.json',
            lab_basepath: '/api/pages/lab/',
            project_basepath: '/api/pages/project/',
            project_url: '/project/',
            lab_url: '/lab/'
        };
        return {
            getPageUrl:function(pageRoute){
                return map[pageRoute];
            },
            getBaseDataExtension: function() {
                return '.json'
            },
            getProjectDataExtension: function(){
                return this.getBaseDataExtension();
            }
        }
    }]);
}