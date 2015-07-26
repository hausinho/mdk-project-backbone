require([
	'jquery',
	'backbone',
	'app',
	'router',

],

	function ($, Backbone, App, Router) {

		// Define your master router on the application namespace and trigger all
		// navigation from this instance.
		App.router = new Router();

		// Trigger the initial route and enable HTML5 History API support.
		Backbone.history.start({ pushState: true, root: App.ROOT });

		// All navigation that is relative should be passed through the navigate
		// method, to be processed by the router. If the link has a `data-bypass`
		// attribute, bypass the delegation completely.
		$(document).click(function(event){

			// Ignore right-clicks
			if (event.button == 2)
			  return;

			var link = $(event.target).closest('a');

			if(link && !(link[0] instanceof HTMLAnchorElement))
				return;
			
			// check if href
			var linkInst = $(link);
			var href =  linkInst.attr('href');
			if(!href) return;
			
			// check if target is required
			if(linkInst.attr('target')) return;

			event.preventDefault();
			event.stopPropagation();
			Backbone.history.navigate(href, true);

		});

	});