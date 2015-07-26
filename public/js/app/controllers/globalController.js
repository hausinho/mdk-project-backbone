define(function (require, exports, module) {
	var App = require('app');
	var BlurUtil = require('blur');
	var ErrorModule = require('modules/globalpages/error');
	var FrontPageDataModule = require('modules/frontpage/admin/frontpageData');
	var utils = require('utils');	

	var GlobalController = function() {};
	
	GlobalController.prototype.notFound = function() {	
		App.useLayout('globalpages/404', '404').setViews({
			'.errorDiv': new ErrorModule.View()
		}).render();
		utils.changeBackground();
	};
	
	GlobalController.prototype.frontPageData = function() {	
		App.useLayout('frontpage/admin/frontPageData', 'frontPageData').setViews({
			'.fields': new FrontPageDataModule.View()
		}).render();
	};	

	// Return the module for AMD compliance.
	return GlobalController;
});