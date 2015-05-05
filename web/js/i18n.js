function initializeI18n(app) {
    app.factory('i18n', [function () {
        var language = 'en';
        var labels = {
            'en': {},
            'ru': {}
        };
        labels['ru'] = {
                'dDION INSIDE': 'dDION ВНУТРИ',
                'history': 'история',
                'dDION NEWS': 'dDION новости',
                'project': 'поректы',
                'video': 'видео',
                'media': 'медиа',
                'LAB': 'ЛАБ',
                'concept': 'концепт',
                'prototyping': 'прототипирование',
                'PROJECT': 'ПРОЕКТЫ',
                'subject': '',
                'interior': '',
                'space': 'пространство',
                'architecture': 'архитектура',
                'dDION and YOU': 'dDION и ВЫ',
                'career': 'карьера',
                'legal information': 'правовая информация',
                'privacy policy': 'приватность',
                'CONTACT': 'КОНТАКТ',
                'office': 'офис',
                'press': 'пресса',
                'following': 'следуйте'
            };
        return {
            setCurrent: function(newLanguage) {
                language = newLanguage;
                return this;
            },
            getCurrent: function () {
                return language;
            },
            getLabel: function(label){
                console.log("label", label, this.getCurrent(), labels[this.getCurrent()]);
                if (labels[this.getCurrent()] && labels[this.getCurrent()][label]) {
                    return labels[this.getCurrent()][label];
                }
                return label;
            }
        }
    }]);
}