define(function (require, exports, module) {
	var App = require('app');
	var CompetitionListModule = require('modules/competitions/competitionList');
	var CompetitionDetailsModule = require('modules/competitions/competitionQuestion');	
	var auth = require('authentication');
	var api = require('API');

	var CompController = function() {};

	CompController.prototype.initPage = function() {
		this.competitionListCollection = new CompetitionListModule.Collection();
		this.competitionListCollection.fetch();
		this.competitionListCollection.on('sync', function(){
			App.useLayout('competitions/competitions', 'competitions').setViews({
				'.allComp': new CompetitionListModule.View({collection: this.competitionListCollection})
			}).render();
			$('#nav li a').parent('li').removeClass();
			$('#nav li a.currentinteraction').parent('li').addClass('active');
			$('#nav').removeClass().addClass('bcomp');			
		}, this);
	};
	
	CompController.prototype.initCompetition = function(contest_id, image_id) {


		this.competitionDetailsModel = new CompetitionDetailsModule.Model({contest_id: contest_id});
		this.competitionDetailsModel.fetch();
		this.competitionDetailsModel.on('sync', function(){
			this.competitionDetailsView = new CompetitionDetailsModule.View({model:this.competitionDetailsModel, show_detail_modal_with_image_id:image_id || null});
			App.useLayout('competitions/competitionDetails', 'competitions/competitionDetails').setViews({
				'.questionDetails' : this.competitionDetailsView
			}).render();
			$('#nav li a').parent('li').removeClass();
			$('#nav li a.currentinteraction').parent('li').addClass('active');
			$('#nav').removeClass().addClass('bcomp');			
		}, this);		

	};

	// Return the module for AMD compliance.
	return CompController;
	
});