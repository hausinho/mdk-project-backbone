define(function (require, exports, module) {
	var App = require('app');
	var singleQuiz = require('modules/quiz/singleQuiz');
	var QuizList = require('modules/quiz/quizList');
	var auth = require('authentication');
	var api = require('API');

	var quizController = function() {};

	quizController.prototype.allQuizzes = function() {

		this.quizlistCollection = new QuizList.Collection();
		this.quizlistCollection.fetch();
		this.quizlistCollection.on('sync', function(){
			App.useLayout('quiz/quizzes', 'quizzes').setViews({
				'.allQuizzes': new QuizList.View({collection: this.quizlistCollection})
			}).render();
			$('#nav li a').parent('li').removeClass();
			$('#nav li a.currentquizzes').parent('li').addClass('active');
			$('#nav').removeClass().addClass('bquiz');			
		}, this);

	};
	
	quizController.prototype.singleQuiz = function(artist_slug, quiz_slug) {		

		var mdl = new singleQuiz.Model({artist_slug: artist_slug, quiz_slug: quiz_slug});
		mdl.fetch();
		mdl.on('sync', function(){
			App.useLayout('quiz/skeleton/single', 'singleQuiz').setViews({
				'#cw' : new singleQuiz.View({model: mdl})
			}).render();			
			$('#nav li a').parent('li').removeClass();
			$('#nav li a.currentquizzes').parent('li').addClass('active');
			$('#nav').removeClass().addClass('bquiz');	
		}, this);	
	};

	quizController.prototype.singleQuizBattle = function(artist_slug, quiz_slug, battle_quiz_taken_id){

		var mdl = new singleQuiz.Model({
			artist_slug: artist_slug, 
			quiz_slug: quiz_slug, 
			battle_quiz_taken_id: battle_quiz_taken_id
		});
		mdl.fetch();
		var self = this;
		mdl.on('sync', function(){

			// Redirect to single quiz view if battle not exists
			if(!mdl.has('battle')) return Backbone.history.navigate('/'+artist_slug+'/quiz/'+quiz_slug, true); 

			App.useLayout('quiz/skeleton/single', 'singleQuiz').setViews({
				'#cw' : new singleQuiz.View({model: mdl})
			}).render();
			$('#nav li a').parent('li').removeClass();
			$('#nav li a.currentquizzes').parent('li').addClass('active');
			$('#nav').removeClass().addClass('bquiz');
		}, this);
	};

	// Return the module for AMD compliance.
	return quizController;
	
});