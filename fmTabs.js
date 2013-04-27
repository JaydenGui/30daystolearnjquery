(function($){
	$.fn.fmTabs = function(options){
		
		// We set some default options and we extend those options so the user can override them
		var options = $.extend({
			fade: null,
			tabTitleReference: 'h2',
			interval: null,
			startTab: 1,
			tabContainerName: 'tab-items'
		}, options);

		this.each(function(){
			var $this = $(this),
			divCount = $this.children('div').length,
			tabContainer = '<ul id="' + options.tabContainerName + '">';

			$this
				.children('div:not(:nth-child(' + options.startTab + '))')
				.hide()
				.end() // end allows us to continue chaining
				.hover(function(){
					// on hover
					$this.addClass('hovered');	
				}, function(){
					// on mouseout
					$this.removeClass('hovered');
				});

			for(var i = 1; i <= divCount; i++){
				if( options.tabTitleReference) {
					var heading =
						$this.children('div:nth-child(' + i + ')')
						.find(options.tabTitleReference)
						.filter(':first')
						.text();

					if(heading !== '') tabContainer += '<li><a href="#" rel="' + i + '">' + heading + '</a></li>';
					else tabContainer += '<li><a href="#" rel="' + i + '">' + i + '</a></li>';
				} else{
					tabContainer += '<li><a href="#" rel="' + i + '">' + i + '</a></li>';
				}
			};

			tabContainer += '</ul>';
			$this.prepend(tabContainer);
			// console.log(tabContainer);

			var $container = $('#' + options.tabContainerName);

			$container
				.find('li:nth-child(' + options.startTab + ')')
					.addClass('tab-selected')
				.end()
				.find('a')
					.click(function(){
						var $a = $(this),
						num = $a.attr('rel');
						if( $this
								.children('div')
								.eq(num-1)
								.is(':visible')
							) return false; // user is already on selected tab

						$container
							.find('li.tab-selected')
							.removeClass('tab-selected');

						$a.parent().addClass('tab-selected');

						if( options.fade ) {
							$this
								.children('div')
								.hide()
								.eq(num-1)
								.fadeIn(options.fade);
						} else {
							$this
								.children('div')
								.eq(num-1)
								.show();
						}

						return false;
					});

				// auto change the tabs

				if (options.interval) {
					var i = options.startTab;

					setInterval(function(){
						if( !$this.hasClass('hovered')){
							$container
								.find('a')
								.eq(i)
								.trigger('click');
							i++;
							if( i === divCount) i = 0;
						}
					}, options.interval)
				}
		});
		// end each
	}

})(jQuery);