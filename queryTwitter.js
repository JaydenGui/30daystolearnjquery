// Utility
if ( typeof Object.create !== 'function'){
	Object.create = function(obj){
		function F(){};
		F.prototype = obj;
		return new	F();
	};
}
// Create a plugin by extending jQuery's prototype
(function($, window, document, undefined) {
	// Best practice is to create a siaf and pass in the jQuery object

	// Create our object
	var Twitter = {
		init: function( options, elem){
			var self = this; // store a reference to this

			// Save the element reference, both as jQuery reference and a normal reference
			self.elem = elem;
			self.$elem = $(elem);

			self.url = 'http://search.twitter.com/search.json';

			self.search = ( typeof options === 'string' )
			? options
			: options.search;
			// Mix in the passed in options with the default options
				self.options = $.extend({}, $.fn.queryTwitter.options, options );

			self.refresh();
		},

		// Let's call the methods fetch and display

		refresh: function(length) {
			var self = this;

			setTimeout(function(){
				// console.log(self);
				self.fetch().done(function (results){
					results = self.limit(results.results, self.options.limit);
					self.buildFrag(results); // A call to build the HTML fragment
					self.display(); // A call to display the fragment

					if ( typeof self.options.onComplete === 'function') {
						self.options.onComplete.apply(self.elem, arguments);
					}

					if ( self.options.refresh ){
						self.refresh();
					}
				});
			}, length || self.options.refresh );
			
		},

		// Let's query the Twitter api

		fetch: function (){
			return $.ajax({
				url: this.url,
				data: { q: this.search },
				dataType: 'jsonp'
			});
		},

		buildFrag: function(results){
			var self = this;

			self.tweets = $.map( results, function ( obj, i ) {
				return $( self.options.wrapEachWith ).append ( obj.text )[0];
			});
		},

		// Let's display our results

		display: function(){
			var self = this;

			if (self.options.transition === 'none' || !self.options.transition) {
				self.$elem.html(this.tweet);
			}
			else{
					self.$elem[ self.options.transition ]( 500, function(){
					$(this).html( self.tweets )[ self.options.transition]( 500 );
				});
			}
		},

		limit: function( obj, count ) {
			return obj.slice(0, count)
		}
	};
	$.fn.queryTwitter = function(options){
		// Need to return the jQuery object so we can continue chaining
		return this.each(function(){
			// console.log(this);
			var twitter = Object.create(Twitter); // Create a new Twitter instance for each object
			twitter.init(options, this);

			$.data( this, 'queryTwitter', twitter);
		});
	};

	$.fn.queryTwitter.options = {
		// Allows the user to set their own defaults w/o overriding the plugin defaults
		search: '@tutspremium',
		wrapEachWith: '<li></li>',
		limit: 10,
		refresh: null, // Optional null value, but used as a reminder of which options are available
		onComplete: null,
		transition: 'fadeToggle'

	};
})(jQuery, window, document); 