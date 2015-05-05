function initializeProjectsBlock(app) {
    app.provider('ProjectsBlock', [function(){
        return {
            $get: ['InfoBlock', function(InfoBlock){
                ProjectsBlock.prototype = angular.extend({}, InfoBlock.prototype, ProjectsBlock.prototype);
                return ProjectsBlock;
            }]
        }
    }]);
    app.run(['BlockManager', 'ProjectsBlock', 'Loader', function(BlockManager, FormBlock, Loader){
        BlockManager.addBlockType('projects', FormBlock);

        ProjectsBlock.prototype.getProjectUrl = function(concept){
            return Loader.getPageUrl('project_url') + concept.id;
        };

        ProjectsBlock.prototype.activateConcept = function(concept){
            angular.forEach(this.getData().concepts, function(target){
                if (target.id != concept.id) {
                    target.class = [];
                }
            });
            concept.class = ['active'];
            setTimeout(function(){
                this.getSlider().resetSlide(concept.bg);
            }.bind(this), 1);
        };
    }]);
};

function ProjectsBlock(blockData) {
    this.initializeData(blockData);
    this.templateUrl = '/html/blocks/projects.html.tpl';
    this.activateConcept(blockData.concepts[0]);
};