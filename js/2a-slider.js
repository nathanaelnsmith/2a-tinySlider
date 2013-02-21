(function( $ ) {
	$.fn.tinySlider = function( options ) {
		
		var settings = $.extend({
			container : this,
			slideHolder : "ul",
			slide : "li",
			slideNav : ".nav .wrapper",
			arrowsWrap : ".arrows",
			navBtns : {
				left : "a.prev",
				right : "a.next",
				slide : "a"	
			},
			slideCount : function () {
				return this.container.find(this.slideHolder + ' > ' + this.slide).length;
			},
			slideWidth : function () {
				return this.container.find(this.slideHolder + ' ' + this.slide).width();
			},
			isAnimating : 0,
			speed : 200,
			auto : false,
			delay : 6000,
			nav : true,
			pause : true,
			progress : false,
			carousel : false
		}, options);
		var s = settings;
		// Get holder width when looping is off
		if (s.carousel == true) {
			settings.container.find(s.slideHolder).width((s.slideCount() * s.slideWidth()) + 'px');
		}
		// Hide nav when only one image or nav is disabled
		if (settings.slideCount() == 1 || settings.nav == false) {
			settings.container.find(settings.arrowsWrap + ',' + settings.slideNav).hide();
		} else {
			// Create nav buttons
			for(var i = 0; i < settings.slideCount(); i++) {
				$(settings.slideNav).append("<" + settings.navBtns.slide + " data-slide-id='" + i + "' href='#'>" + i + "</" + settings.navBtns.slide + ">");
			}
		}
		// Set active states
		settings.container.find(settings.slideHolder + ' ' + settings.slide + ":first-child").addClass('active');
		settings.container.find(settings.slideNav + ' ' + settings.navBtns.slide + ":first-child").addClass('active');
		// Bind navigation
		settings.container.find(settings.navBtns.right).click(function(e){
			if(!settings.isAnimating) {
				e.preventDefault();
				if (s.carousel == true) {
					shiftCarousel('right');
				} else {
					nextSlide('right');
				}
				if (settings.auto) {
					clearInterval(auto);
					autoRotate();
				}
			}
		});
		settings.container.find(settings.navBtns.left).click(function(e){
			if(!settings.isAnimating) {
				e.preventDefault();
				if (s.carousel == true) {
					shiftCarousel('left');
				} else {
					nextSlide('left');
				}
				if (settings.auto) {
					clearInterval(auto);
					autoRotate();
				}
			}
		});
		settings.container.find(settings.slideNav).children().click(function(e){
			if(!settings.isAnimating) {
				e.preventDefault();
				nextSlide(parseInt($(this).attr('data-slide-id')));
			}
		});
		
		// Start auto rotate
		$(function(){
			if (settings.auto) {
				autoRotate();
				if (settings.pause) {
	  				settings.container.find(settings.slide).hover(function(){ 
	  					autoRotate('pause');
	  					if (settings.progress) {
	  						progress('pause');
	  					}
	  				}, function() {
	  					autoRotate();
	  				});
				}
			}			
		});
		var autoRotate = function (action) {
			if(action == 'pause') {
				clearInterval(auto);
			} else {
				auto = window.setInterval( function() { 
					nextSlide('right');
				}, settings.delay);
	  			if (settings.progress) {
					progress();
				}
			}
		}
		
		var nextSlide = function (direction) {
			var currentSlide = settings.container.find(settings.slideHolder + ' ' + settings.slide + '.active').index(), nextSlide, animateFrom, animateTo;
			settings.isAnimating = 1;
			if(typeof direction === 'number') {
				nextSlide = direction;
				direction = (nextSlide > currentSlide) ? 'right' : 'left';
			}
			if (direction == 'right') {
				if (typeof nextSlide !== 'number') {
					nextSlide = (currentSlide == (settings.slideCount() - 1)) ? 0 : currentSlide + 1;
				}
				animateFrom = settings.slideWidth();
				animateTo = '-=' + settings.slideWidth();
			} else {
				if (typeof nextSlide !== 'number') {
					nextSlide = (currentSlide == 0) ? settings.slideCount() - 1 : currentSlide - 1;
				}
				animateFrom = -settings.slideWidth();
				animateTo = '+=' + settings.slideWidth();
			}
			// Animate next slide
			settings.container.find(settings.slideHolder + ' ' + settings.slide +  ':eq(' + nextSlide + ')')
			  .css('left',animateFrom)
			  .show()
			  .animate({
			  		left: animateTo
			    }, settings.speed, 
			    function() {
				    $(this).addClass('active');
				    settings.isAnimating = 0;
				    settings.container.find(settings.slideNav + ' ' + settings.navBtns.slide + ":eq(" + nextSlide + ")").addClass('active').siblings().removeClass('active');
			  });
			// Animate active slide
			settings.container.find(settings.slideHolder + ' ' + settings.slide + '.active').animate({
			    left: animateTo
			  }, settings.speed, function() {
			    $(this).removeClass('active').hide();
			});
	  		if (settings.progress) {
				$('.progress .bar').stop();
		  		progress();
			}
		}
		
		var shiftCarousel = function (direction) {
			var cw = s.slideCount() * s.slideWidth(),
				co = Math.abs(parseFloat(s.container.find(s.slideHolder).css('left'))),
				cv = parseFloat(s.container.width()),
				cp = parseFloat(s.container.css('paddingLeft'));
			if((s.container.find(s.slideHolder + ':animated').length == 0) && 
			((direction == 'left' && co != cp) || 
			(direction == 'right' && (co + cv + cp) < cw))) {
				s.container.find(s.slideHolder).animate({
					left: ((direction == 'left') ? '+=' : '-=') + s.slideWidth()
				}, {
					duration: s.speed,
					queue: false
				});
			}
		}
		
		var progress = function (action) {
			$('.progress .bar').stop().width('0%');
			if(action != 'pause') {
				$('.progress .bar').animate({
					width: '100%'
				}, {
					duration: settings.delay, 
					easing: 'linear',
					queue: false
				});
			}
		}
		
	};
})( jQuery );