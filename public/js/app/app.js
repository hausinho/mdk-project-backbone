define([
	'jquery',
	'underscore',
	'backbone',
	'pace',
	'layoutmanager',
	'handlebars',
	'magnificPopup',
	'hello',
	'datetimepicker',
	'jqueryui',
	'countdown',
	'handlebarHelpers',
	'lazysizes',
	'facebook'
],
function ($, _, Backbone, pace, layoutmanager, handlebars, magnificPopup, hello, datetimepicker, jqueryui, countdown, handlebarHelpers, lazysizes, FB) {

		// Provide a global location to place configuration settings and module
		// creation.
		// Check the host URL to set one config or other dpeending
		
		var BASE_HOST = location.hostname;

		var App = {};
		
		if(BASE_HOST === 'localhost'){
			// DEVELOPMENT SETTINGS
			// THIS MUST BE REMOVED ONCE DEPLOYED
			App = {
				ROOT: '',
				PORT: ':3000',
				ENV: 'dev',
				APIO: 'https://devapi.musik.dk',
				// APIO_PORT: ':443'
				HOST: 'http://localhost:3000',
				// APIO: 'http://localhost:2100',
				AD_APIO: 'https://adminapi76.musik.dk',
				clients: {
					google: '96709818823-qaf82e113og1jqqltlic0pp2dl2u7e82.apps.googleusercontent.com',
					twitter: 'UnUDsmttnEAWl192DQ8e9xa71',
					facebook: '271090269744407'
				}
			};
		} 
		else if(BASE_HOST === 'stage.musik.dk') {
			App = {
				ROOT: '',
				PORT: '',
				ENV: 'dev',
				HOST: 'https://stage.musik.dk',
				APIO: 'https://devapi.musik.dk',
				AD_APIO: 'https://adminapi76.musik.dk',
				clients: {
					google: '96709818823-kvsmbdld8hah2q9fhda5q93brbdnld8j.apps.googleusercontent.com',
					twitter: 'UnUDsmttnEAWl192DQ8e9xa71',
					facebook: '257604381092996'
				}
			};
		}
		else 
		{
			// PRODUCTION SETTINGS
			// THIS MUST BE REMOVED ONCE DEPLOYED
			App = {
				ROOT: '',
				PORT: '',
				ENV: 'pro',
				HOST: 'https://musik.dk',
				APIO: 'https://api.musik.dk',
				AD_APIO: 'https://adminapi76.musik.dk',
				clients: {
					google: '96709818823-kvsmbdld8hah2q9fhda5q93brbdnld8j.apps.googleusercontent.com',
					twitter: 'UnUDsmttnEAWl192DQ8e9xa71',
					facebook: '257604381092996'
				}
			};
		}
		
		// Localize or create a new JavaScript Template object.
		var JST = window.JST = window.JST || {};
		
		// Configure LayoutManager with Backbone Boilerplate defaults.
		Backbone.Layout.configure({
			// Allow LayoutManager to augment Backbone.View.prototype.
			manage: true,

			prefix: window.tmpURL,

			fetchTemplate: function (path) {
				// Concatenate the file extension.
				path = path + '.html';

				// If cached, use the compiled template.
				if (JST[path]) {
					return JST[path];
				}

				// Put fetch into `async-mode`.
				var done = this.async();

				// Seek out the template asynchronously.
				$.get(App.ROOT + path, function (contents) {
					done(JST[path] = handlebars.compile(contents));
				});

				return JST[path];
			}
		});

		FB.init({
		    appId : App.clients.facebook,
		    status     : true,
		    xfbml      : true,
		    version    : 'v2.0'
		});

		Pace.options = {
			ajax: false
		};	
		
		// Mix Backbone.Events, modules, and layout management into the app object.
		return _.extend(App, {
			// Create a custom object with a nested Views object.
			module   : function (additionalProps) {
				return _.extend({View: {}}, additionalProps);
			},
			

			// Helper for using layouts.
			useLayout: function (name, template) {
				// If already using this Layout, then don't re-inject into the DOM.
				if (this.layout && this.layout.options.template === name) {
					return this.layout;
				}

				// If a layout already exists, remove it from the DOM.
				if (this.layout) {
					this.layout.remove();
				}

				// Create a new Layout.
				var layout = null;

				if (template) {
					layout = new Backbone.Layout({
						template : name,
						className: name,
						id       : 'layout'
					});
				} else {
					layout = new Backbone.Layout({
						className: name,
						id       : 'layout'
					});
				}

				// Insert into the DOM.
				$('#mdkMainWrap').empty().append(layout.el);

				// Render the layout.
				//layout.render();

				// Cache the reference.
				this.layout = layout;

				// Return the reference, for chainability.
				return layout;
			}			
		},Backbone.Events);
			
	});
