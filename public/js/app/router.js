define(function (require, exports, module) {
	var App = require('app');
	var utils = require('utils');
	var auth = require('authentication');
	var querystring = require('queryparams');
	var api = require('API');		
	// Modules
	var MainNavigationModule = require('modules/navigation/mainNavigation');
	var AdminPanelModule = require('modules/admin/adminPanel');


	//Controllers
	//For each page there should be created a controller, because otherwise the router gets too big.
	
	var HomeController = require('controllers/homeController'); 
	var homeController = new HomeController();	
	
	var ArtistController = require('controllers/artistController'); 
	var artistController = new ArtistController();
	
	var VideoController = require('controllers/videoController'); 
	var videoController = new VideoController();

	var CompController = require('controllers/compController'); 
	var compController = new CompController();
	
	var GlobalController = require('controllers/globalController'); 
	var globalController = new GlobalController();

	var QuizController = require('controllers/quizController');
	var quizController = new QuizController();
	
		var ServiceController = require('controllers/serviceController');
	var serviceController = new ServiceController();


	// Show cookie alert.
	utils.showCookiesAlert();
	
	// Set default MusikDK Facebook meta tags
	utils.defaultFbMetaTags();
	
	// Set default MusikDK Twitter Cards
	utils.defaultTwitterCards();
	
	// Initialize scroll-to-top feature
	utils.scrollToTop();

	// Pass query strings as object
	Backbone.Router.namedParameters = true;
	
	// Defining the application router, you can attach sub routers here.
	return Backbone.Router.extend({
		routes: {
			'': 'index',
			'?w=:videoid': 'index',
			'home': 'home',
			'home?w=:videoid': 'home',
			'artister': 'artister',
			'artister/': 'artister',
			'artister/:letter': 'artistLetter',
			'artister/:letter/': 'artistLetter',				
			'konkurrencer' : 'konkurrencer',
			'konkurrencer/' : 'konkurrencer',
			'konkurrencer/:contest_id' : 'conId',
			'konkurrencer/:contest_id/' : 'conId',
			'konkurrencer/:contest_id/upload/:image_id': 'conId',
			'videoer' : 'videoer',
			'videoer/' : 'videoer',
			'quizzer' : 'quizzer',
			// 'digster': 'digster',
			// 'digster/playlist/:playlist_slug': 'digster_playlist',			
			'mdk-admin-frontpage': 'frontPageData',
			'404': '404',
			'404/':'404',
			':name' : 'artistkanal',
			':name/' : 'artistkanal',
			':name/videoer': 'artist_video',
			':name/videoer/': 'artist_video',
			':name/videoer?w=:videoid' : 'artist_video',
			':name/udgivelser': 'artist_discography',
			':name/udgivelser/': 'artist_discography',
			':name/merchandise' : 'artist_merchandise',
			':name/koncerter': 'artist_concerts',
			':name/afstemning': 'artist_poll',
			':name/quiz': 'artist_quiz',
			':name/quiz/:quiz_slug' : 'single_quiz',
			//  SHOP URI
			':name/shop/:shop_id' : 'artist_shop',
			':name/rebelheartyourself': 'rebelheartyourself',		
			':name/setlist': 'fivesos_setlist',	
			':name/konkurrence': 'mumford_sons',	
			':name/sexii': 'liga_campaign',	
			':name/quiz/:quiz_slug/kamp/:quiz_taken_id' : 'single_quiz_battle',
			':name/:name': '404',
			':name/:name/': '404',
			':name/:name/*undefined': '404',
			':name/:name/*undefined/': '404'

		},
		
		initialize: function() {
			this.mainnavigationView =  new MainNavigationModule.View({el: '#nav'});	
			this.adminPanelView =  new AdminPanelModule.View({el: '#fnav'});				
		},

		index: function (params) {
			var watchYtVid = params.w || null;
			homeController.initPage(params.home,watchYtVid);		
			utils.removeMetaTags();
			utils.defaultTwitterCards();	
			utils.defaultFbMetaTags();
		},
		home: function (params) {
			var watchYtVid = params.w || null;
			homeController.initPage(letter, params.home, watchYtVid);
			utils.removeMetaTags();
			utils.defaultTwitterCards();	
			utils.defaultFbMetaTags();
		},
		artister: function(params){
			artistController.initAllArtists();
		},
		artistLetter: function(letter) {
			artistController.initArtistLetter(letter);
		},			
		artistkanal: function (params) {
			if(params.name === '!') return window.location.replace('https://musik.dk'); 
			var watchVideoId = params.w || null;
			artistController.initArtist(params.name, watchVideoId);
		},
		artist_video: function(params){
			var watchVideoId = params.w || null;
			artistController.initVideos(params.name, watchVideoId);			
		},
		artist_discography: function(params){
			artistController.initReleases(params.name);
		},
		artist_merchandise: function(params){
			artistController.initMerchandise(params.name);
		},
		artist_concerts: function(params){
			artistController.initConcerts(params.name);
		},
		artist_poll: function(params){
			artistController.initPoll(params.name);
		},
		artist_shop: function(params){
			artistController.initArtist(params.name, null, params.shop_id);
		},
		artist_quiz: function(params){
			artistController.initQuiz(params.name);
		},
		videoer: function (params) {
			var watchVideoId = params.w || null;
			videoController.initPage(watchVideoId);
			utils.removeMetaTags();
			utils.defaultTwitterCards();	
			utils.defaultFbMetaTags();		
		},	
		konkurrencer: function () {
			compController.initPage();
			utils.removeMetaTags();
			utils.defaultTwitterCards();	
			utils.defaultFbMetaTags();
		},
		quizzer: function(){
			quizController.allQuizzes();
			utils.removeMetaTags();
			utils.defaultTwitterCards();	
			utils.defaultFbMetaTags();				
		},
		digster: function(){
			serviceController.initPage();
		},
		digster_playlist: function(params){
			serviceController.initPlaylist(params.playlist_slug);
		},		
		conId: function(params) {
			App.trigger('view:contest:detail:active', true);
			compController.initCompetition(params.contest_id, params.image_id);
		},
		404: function(){
			globalController.notFound();
			utils.removeMetaTags();
			utils.defaultTwitterCards();	
			utils.defaultFbMetaTags();		
		},

		single_quiz: function(params){
			quizController.singleQuiz(params.name, params.quiz_slug);
		},		
		
		rebelheartyourself: function(params){	
			artistController.initRHY(params.name);
		},

		fivesos_setlist: function(params){
			artistController.initFiveSOS(params.name);
		},

		mumford_sons: function(params){
			artistController.initMumfordSons(params.name);
		},

		liga_campaign: function(params){
			artistController.initLiga(params.name);
		},			
		
		single_quiz_battle: function(params) {
			quizController.singleQuizBattle(params.name, params.quiz_slug, params.quiz_taken_id);
		},
		
		frontPageData: function(){
			globalController.frontPageData();
		}
	});

	});
