  // Set the require.js configuration for your application.
require.config({	
	noGlobal: true,
  // Initialize the application with the main application file.
  deps: ['main'],

  paths: {

    // Libraries.
    jquery       		: 'libs/jquery/dist/jquery.min',
    jcookie   			: 'libs/jquery-cookie/jquery.cookie',
    underscore   	: 'libs/lodash/lodash.min',
    backbone     		: 'libs/backbone/backbone',
    layoutmanager	: 'libs/layoutmanager/backbone.layoutmanager',
  	handlebars	 	: 'libs/handlebars/handlebars.min',
  	blur					: 'libs/StackBlur/StackBlur',
  	pace					: 'libs/pace/pace.min',
  	magnificPopup	: 'libs/magnific-popup/dist/jquery.magnific-popup.min',
  	hello					: 'libs/hello/dist/hello.all.min',
  	authentication 	: 'tools/authentication',
    API					: 'tools/api',
    utils					: 'tools/utils',
	handlebarHelpers: 'tools/handlebarHelpers',
  	datetimepicker	: 'libs/datetimepicker/jquery.datetimepicker',
  	jqueryui			: 'libs/jquery-ui/jquery-ui.min',
    moment 			: 'libs/moment/moment',
    danishMoment 	: 'libs/moment/locale/da',
	countdown		: 'libs/countdown/Countdown',
    imagesLoaded   : 'libs/imagesloaded/imagesloaded.pkgd.min',
	wookmark			: 'libs/wookmark-jquery/jquery.wookmark.min',
    queryparams     : 'libs/backbone-query-parameters/backbone.queryparams.min',
    crossdomain    	: 'libs/backbone.crossdomain/Backbone.CrossDomain',
    lazysizes			: 'libs/lazysizes/lazysizes.min',
	select2				: 'libs/select2/dist/js/select2.full.min',
	trumbowyg		: 'libs/trumbowyg/dist/trumbowyg.min',
	trumbowyg_dk 	: 'libs/trumbowyg/dist/langs/da.min',
	io						: 'https://api.musik.dk/socket.io/socket.io',
	easypiechart		: 'libs/jquery.easy-pie-chart/dist/jquery.easypiechart.min',
	cropper				:'libs/cropper/dist/cropper',
	facebook      		: '//connect.facebook.net/da_DK/all',
	socialpromote 	: '//player.socialpromote.co.uk/js/socialpromote.iframeloader'
  },

  shim: {
    // Backbone library depends on lodash and jQuery.
    backbone  : {
      deps   : ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    facebook : {
        exports: 'FB'
    },
    socialpromote: {
        exports: 'SocialPromote'
    },
    handlebars: {
      exports: 'Handlebars'
    },
    async     : {
      exports: 'async'
    },
    jquery : {
      exports: 'jQuery'
    },
    jqueryui: {
       deps: ['jquery'],
       exports: '$'
    },
    moment: ['jquery'],
    datetimepicker: ['jquery'],
    magnificPopup: ['jquery'],
    countdown: ['jquery'],
    cropper: ['jquery'],
	select2: ['jquery'],
	trumbowyg: ['jquery'],
	trumbowyg_dk: ['jquery'],
    layoutmanager: ['backbone'],
    queryparams: ['backbone'],
    blur: {
      exports: 'blur'
    }

  }

});
require(['facebook', 'wookmark', 'pace']);
