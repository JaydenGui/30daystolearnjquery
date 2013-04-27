// Slider construction function
function Slider(container, nav){
	this.container = container;
	this.nav = nav.show();
	this.imgs = this.container.find('img');
	this.imgWidth = this.imgs[0].width; //600
	this.imgsLen = this.imgs.length;
	this.current = 0;
}

//Slider method for animation
Slider.prototype.transition = function( coords ){
	this.container.animate({
		marginLeft: coords || -( this.current * this.imgWidth )
	});
};

//Slider method for detecting current position
Slider.prototype.setPos = function( dir ){
	var pos = this.current;
	(dir === 'next') ? pos++ : pos--;
	// console.log(this.current);
	this.current = ( pos < 0 ) ? this.imgsLen -1 : pos % this.imgsLen;
	// console.log(pos);
	return pos; // return it so you can do something else with it
}
