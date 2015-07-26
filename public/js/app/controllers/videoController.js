define(function (require, exports, module) {
	var App = require('app');
	var BlurUtil = require('blur');
	var VideoModule = require('modules/videopage/videos');
	var utils = require('utils');	

	var VideoController = function() {};

	VideoController.prototype.initPage = function(videoId) {
		this.videoCollection = new VideoModule.Collection();
		this.videoCollection.fetch();
		this.videoCollection.on('sync', function(){
			App.useLayout('videopage/videos', 'videos').setViews({
				'.singleVideos' : new VideoModule.View({collection: this.videoCollection, video: videoId})
			}).render();
			$('#nav li a').parent('li').removeClass();
			$('#nav li a.currentvideo').parent('li').addClass('active');
			$('#nav').removeClass().addClass('bvideo');
		}, this)
	};

	// Return the module for AMD compliance.
	return VideoController;
});