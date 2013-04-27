(function($){
	var sliderUL = $('div.slider').css('overflow', 'hidden').children('ul'),
		imgs = sliderUL.find('img'),
		imgWidth = imgs[0].width, //600px
		imgsLength = imgs.length, // 4
		current = 1,
		totalImgsWidth = imgWidth * imgsLength; //2400px

		$('#slider-nav').show().find('button').on('click', function(){
			var direction = $(this).data('dir'),
				loc = imgWidth;
			
			//update current value
			( direction === 'next' ) ? ++current : --current;

			//if first or last image
			if ( current === 0 ) {
				current = imgsLength;
				loc = totalImgsWidth - imgWidth;
				direction = 'next';
			} else if ( current - 1 === imgsLength ){
				current = 1;
				loc = 0;
			}

			//we need to animate the transition
			transition(sliderUL, loc, direction );
		});

		function transition( container, loc, direction ) {
			var unit; // -= +=

			if (direction && loc !== 0){
				unit = (direction === 'next') ? '-=' : '+=';
			}
			container.animate({
				'margin-left': unit ? (unit + loc) : loc
			});
		}
})(jQuery);