define(function (require, exports, module) {
	var App = require('app');
	var BlurUtil = require('blur');
	var FrontPageModule = require('modules/frontpage/frontPage');
	var auth = require('authentication');
	var api = require('API');		

	var HomeController = function() {};

	HomeController.prototype.initPage = function(letter, videoId){
		this.frontpageCollection = new FrontPageModule.Collection();
		this.frontpageCollection.fetch();
		this.frontpageCollection.on('sync', function(){
			App.useLayout('mainpages/home', 'home').setViews({
				'.frontpageDiv': new FrontPageModule.View({collection: this.frontpageCollection, video: videoId})
			}).render();			
		}, this);
		$('#nav').removeClass();
		$('#nav li a').parent('li').removeClass();		
	};

	// Return the module for AMD compliance.
	return HomeController;
});