define(function (require, exports, module) {
	var App = require('app');
	var BlurUtil = require('blur');
	var DigsterModule = require('modules/digster/digster');
	var DigsterPlaylist = require('modules/digster/digsterPlaylist');
	var utils = require('utils');	

	var ServiceController = function() {};
	
	ServiceController.prototype.initPage = function() {	
		App.useLayout('digster/digster', 'digster').setViews({
			'.digsterContent': new DigsterModule.View({collection: this.digsterCollection})
		}).render();	
	};
	
	ServiceController.prototype.initPlaylist = function(playlist_slug) {
		this.digsterplaylistModel = new DigsterPlaylist.Model({slug:playlist_slug});
		this.digsterplaylistModel.fetch();
		this.digsterplaylistModel.on('sync', function(){		
		App.useLayout('digster/digster', 'digster').setViews({
			'.digsterContent': new DigsterPlaylist.View({model: this.digsterplaylistModel})
		}).render();
			$('#nav li a').parent('li').removeClass();
			$('#nav li a.currentdigster').parent('li').addClass('active');
			$('#nav').removeClass().addClass('bdigster');			
		}, this);
	};	

	// Return the module for AMD compliance.
	return ServiceController;
});