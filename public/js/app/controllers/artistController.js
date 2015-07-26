define(function (require, exports, module) {
	var App = require('app');
	var AllArtistsModule = require('modules/artist/allArtists');
	var ArtistModule = require('modules/artist/artist');
	var AZArtistsModule = require('modules/artist/azArtists');
	var ArtistReleasesModule = require('modules/artist/artistReleases');
	var ArtistVideosModule = require('modules/artist/artistVideos');
	var ArtistConcertsModule = require('modules/artist/artistConcerts');
	var ArtistMerchandiseModule = require('modules/artist/artistMerchandise');
	var ArtistPollModule = require('modules/artist/artistPoll');
	var ArtistQuizModule = require('modules/artist/artistQuiz');
	var ArtistTopBar = require('modules/navigation/artistTabs');
	var AZNavModule = require('modules/navigation/alphabetNavigation');
	var utils = require('utils');
	
	// CUSTOM CAMPAIGNS
	var Madonna = require('modules/custom/artist/campaigns/madonna_campaign');	
	var FiveSOS = require('modules/custom/artist/campaigns/five_sos');	
	var MumfordSons = require('modules/custom/artist/campaigns/mumford_sons');	
	var Liga = require('modules/custom/artist/campaigns/liga_campaign');	

	var ArtistController = function() {};
	
	ArtistController.prototype.initAllArtists = function(name, letter) {
		var artistsbg = 'https://static.musik.dk/upload/files/live.jpg';
		utils.changeBackground(artistsbg);				
		this.allArtistsCollection = new AllArtistsModule.Collection();
		this.allArtistsCollection.fetch();
		this.allArtistsCollection.on('sync', function(){
			App.useLayout('artist/allArtists', 'allArtists').setViews({
				'.alphabetNav': new AZNavModule.View(),
				'.allArtistsDiv': new AllArtistsModule.View({collection: this.allArtistsCollection})
			}).render();
			$('#nav li a').parent('li').removeClass();
			$('#nav li a.currentartists').parent('li').addClass('active');
			$('#nav').removeClass().addClass('bartists');			
		}, this);
	};
	
	ArtistController.prototype.initArtistLetter = function(letter) {	
		this.azartistsCollection = new AZArtistsModule.Collection();
		this.azartistsCollection.attrs = letter;
		this.azartistsCollection.fetch();
		this.azartistsCollection.on('sync', function(){
			App.useLayout('artist/allArtists', 'allArtists').setViews({
				'.alphabetNav': new AZNavModule.View(),
				'.allArtistsDiv': new AZArtistsModule.View({collection: this.azartistsCollection})
			}).render();
			$('#nav li a').parent('li').removeClass();
			$('#nav li a.currentartists').parent('li').addClass('active');
			$('#nav').removeClass().addClass('bartists');	
		}, this);
	};	
		
	ArtistController.prototype.initArtist = function(name, videoId, shopId) {
		this.artistModel = new ArtistModule.Model({slug: name});
		this.artistModel.fetch();
		this.artistModel.on('sync', function(){

			if(shopId) {

				// Search for shop required
				// this is a really really bad code implementation
				// but for the requirement it will work.
				var shops = this.artistModel.get('shop');
				var shop_requested = _.find(shops, {shop_item_id: parseInt(shopId)});
				shop_requested.slug = name;
				if(!shop_requested) return Backbone.history.navigate('/'+name, {trigger:true});
				this.artistModel.set('shop_selected', shop_requested);

			}

			App.useLayout('artist/artistchannel', 'artistchannel').setViews({
				'#acmenuwrap': new ArtistTopBar({model: this.artistModel}),
				'.artistChannelDiv' : new ArtistModule.View({model: this.artistModel, video: videoId})
			}).render();


		}, this);
		$('#nav').removeClass();
		$('#nav li a').parent('li').removeClass();
		window.scrollTo(0,0);
	};	
	
	ArtistController.prototype.initVideos = function(name, videoId) {	
		this.artistvideoModel = new ArtistVideosModule.Model({slug: name});
		this.artistvideoModel.fetch();
		this.artistvideoModel.on('sync', function(){
			 App.useLayout('artist/artistchannel', 'artistchannel').setViews({
				 '#acmenuwrap': new ArtistTopBar({model: this.artistvideoModel}),
				'.artistChannelDiv' : new ArtistVideosModule.View({model: this.artistvideoModel, video: videoId})
			 }).render();			
		}, this);
		$('#nav').removeClass();
		$('#nav li a').parent('li').removeClass();
		window.scrollTo(0,0);
	};

	ArtistController.prototype.initReleases = function(name) {
		this.artistreleasesModel = new ArtistReleasesModule.Model({slug: name});
		this.artistreleasesModel.fetch();
		this.artistreleasesModel.on('sync', function() {
			 App.useLayout('artist/artistchannel', 'artistchannel').setViews({
				 '#acmenuwrap': new ArtistTopBar({model: this.artistreleasesModel}),
				'.artistChannelDiv' : new ArtistReleasesModule.View({model: this.artistreleasesModel})
			 }).render();						
		}, this);
		$('#nav').removeClass();
		$('#nav li a').parent('li').removeClass();
		window.scrollTo(0,0);
	};
	
	ArtistController.prototype.initConcerts = function(name) {
		this.artistconcertsModel = new ArtistConcertsModule.Model({slug: name});
		this.artistconcertsModel.fetch();
		this.artistconcertsModel.on('sync', function() {
			App.useLayout('artist/artistchannel', 'artistchannel').setViews({
				'#acmenuwrap': new ArtistTopBar({model: this.artistconcertsModel}),
				'.artistChannelDiv' : new ArtistConcertsModule.View({model: this.artistconcertsModel})
			}).render();				
		}, this);
		$('#nav').removeClass();
		$('#nav li a').parent('li').removeClass();		
		window.scrollTo(0,0);
	};
	
	ArtistController.prototype.initMerchandise = function(name) {
		this.artistMerchandiseModel = new ArtistMerchandiseModule.Model({slug: name});
		this.artistMerchandiseModel.fetch();
		this.artistMerchandiseModel.on('sync', function() {	
			App.useLayout('artist/artistchannel', 'artistchannel').setViews({
				'#acmenuwrap': new ArtistTopBar({model: this.artistMerchandiseModel}),
				'.artistChannelDiv' : new ArtistMerchandiseModule.View({model: this.artistMerchandiseModel})
			}).render();		
		}, this);
		$('#nav').removeClass();
		$('#nav li a').parent('li').removeClass();
		window.scrollTo(0,0);
	};

	// TEMP Controller for TV2 Poll
	ArtistController.prototype.initPoll = function(name) {
		this.artistPoll = new ArtistPollModule.Model({slug: name});
		this.artistPoll.fetch();
		this.artistPoll.on('sync', function() {
			App.useLayout('artist/artistchannel', 'artistchannel').setViews({
				'#acmenuwrap': new ArtistTopBar({model: this.artistPoll}),
				'.artistChannelDiv' : new ArtistPollModule.View({model: this.artistPoll})
			}).render();	
		}, this);
		$('#nav').removeClass();
		$('#nav li a').parent('li').removeClass();
		window.scrollTo(0,0);
	};	
	
	ArtistController.prototype.initQuiz = function(name) {
		this.artistQuizModel = new ArtistQuizModule.Model({slug: name});
		this.artistQuizModel.fetch();
		this.artistQuizModel.on('sync', function() {
			App.useLayout('artist/artistchannel', 'artistchannel').setViews({
				'#acmenuwrap': new ArtistTopBar({model: this.artistQuizModel}),
				'.artistChannelDiv' : new ArtistQuizModule.View({model: this.artistQuizModel})
			}).render();	
		}, this);
		$('#nav').removeClass();
		$('#nav li a').parent('li').removeClass();
		window.scrollTo(0,0);
	};

	// Madonna Campaign
	ArtistController.prototype.initRHY = function(name) {	
		var madonnabg = 'https://static.musik.dk/upload/artist_images/m/madonna_10454/1300x540_madonna.jpg';
		utils.changeBackground(madonnabg);			
		this.madonnaView = new Madonna.View();
			App.useLayout('artist/custom_template/artistchannel_custom', 'madonna_campaign').setViews({
				'.artistChannelDiv' : this.madonnaView
			}).render();
		window.scrollTo(0,0);
	};

	// 5 Seconds of Summer Setlist Campaign
	ArtistController.prototype.initFiveSOS = function(name) {
		var fivesosbg = 'https://static.musik.dk/upload/artist_images/5/5_seconds_of_summer_19068/1300x540_5Second_5Second_CoverAr_3000DPI300RGB1015452.jpg';
		utils.changeBackground(fivesosbg);			
		this.fivesosView = new FiveSOS.View();
			App.useLayout('artist/custom_template/artistchannel_custom', 'fivesos').setViews({
				'.artistChannelDiv' : this.fivesosView
			}).render();
		window.scrollTo(0,0);
	};
	
	// Mumford & Sons Spotify Campaign
	ArtistController.prototype.initMumfordSons = function(name) {
		var mumford_sons_bg = 'https://static.musik.dk/upload/artist_images/m/mumford__sons_11909/1300x540_11909_675688.jpeg';
		utils.changeBackground(mumford_sons_bg);			
		this.mumfordsonsView = new MumfordSons.View();
			App.useLayout('artist/custom_template/artistchannel_custom', 'mumfordsons').setViews({
				'.artistChannelDiv' : this.mumfordsonsView
			}).render();
		window.scrollTo(0,0);
	};	

	// L.I.G.A. Campaign
	ArtistController.prototype.initLiga = function(name) {
		var liga_bg = 'https://static.musik.dk/upload/artist_images/l/liga_9869/1300x540__MG_4938_2.jpg';
		utils.changeBackground(liga_bg);			
		this.ligaView = new Liga.View();
			App.useLayout('artist/custom_template/artistchannel_custom', 'liga').setViews({
				'.artistChannelDiv' : this.ligaView
			}).render();
		window.scrollTo(0,0);
	};		
	// Return the module for AMD compliance.
	return ArtistController;
});
