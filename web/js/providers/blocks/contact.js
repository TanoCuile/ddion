function initializeContactBlock(app) {
    app.provider('ContactBlock', [function () {
        return {
            $get: ['InfoBlock','Loader', '$http',  function (InfoBlock, Loader, $http) {

                ContactBlock.prototype.contactUs = function() {
                    $http.post(Loader.getPageUrl('mail_it'), this.contact).success(function(){

                    });
                };
                ContactBlock.prototype = angular.extend({}, InfoBlock.prototype, ContactBlock.prototype);
                return ContactBlock;
            }]
        };
    }]);
    app.run(['BlockManager', 'ContactBlock', function (BlockManager, ContactBlock) {
        BlockManager.addBlockType('contact', ContactBlock);
    }]);
}

function ContactBlock(blockData) {
    this.initializeData(blockData);
    this.getSlider().initialize();

    this.contactViewInitialize();
    this.contact = {
        name: '',
        email: '',
        message: ''
    };
};

ContactBlock.prototype.contactViewInitialize = function() {
    this.templateUrl = '/html/blocks/contact.html.tpl';
    this.view.contactDataClass = [
        (this.getData().showContent ? 'visible' : 'invisible')
    ];
    this.view.titleClass = [
        (this.getData().position ? this.getData().position : 'bottom-left')
    ];
    this.footer = {
    };
};

function hideContentBlock(entity) {
    var classIndex = entity.view.contactDataClass.indexOf('visible');
    entity.view.contactDataClass.splice(classIndex, 1);
    if (entity.view.contactDataClass.indexOf('invisible') < 0) {
        entity.view.contactDataClass.push('invisible');
    }
    setTimeout(function () {
        if (entity.view.titleClass.indexOf('top-left') >= 0) {
            entity.view.titleClass.splice(entity.view.titleClass.indexOf('top-left'), 1);
        }
        entity.view.titleClass.push('bottom-left');
        entity.$apply();
    }, 500);
}

function showContentBlock(entity) {
    var classIndex = entity.view.contactDataClass.indexOf('invisible');
    if (entity.view.titleClass.indexOf('bottom-left') >= 0) {
        entity.view.titleClass.splice(entity.view.titleClass.indexOf('bottom-left'), 1);
    }
    entity.view.titleClass.push('top-left');
    setTimeout(function () {
        entity.view.contactDataClass.splice(classIndex, 1);
        if (entity.view.contactDataClass.indexOf('visible') < 0) {
            entity.view.contactDataClass.push('visible');
        }
        entity.$apply();
    }, 300);
}
ContactBlock.prototype.toggleContent = function () {
    var entity = this;
    var classIndex = entity.view.contactDataClass.indexOf('invisible');

    if (classIndex >= 0) {
        showContentBlock(entity);
    } else {
        hideContentBlock(entity);
    }
};