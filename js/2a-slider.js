(function( $ ) {
	
	var methods = {
		init : function ( options ) {
			var s, settings = $.extend({
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
					return this.container.find(this.slideHolder + ' > ' + this.slide).width();
				},
				isAnimating : 0,
				speed : 200,
				auto : true,
				delay : 6000,
				nav : true,
				pause : true,
				progress : false,
				carousel : false,
				loop : false
			}, options);
			s = methods.s = settings;
						
			// Setup carousel mode
			if (s.carousel) {
				s.container.find(s.slideHolder).width((s.slideCount() * s.slideWidth()) + 'px');
			}
			methods.navCheck();
			methods.bindEvents();
			
			// Set active states
			s.container.find(s.slideHolder + ' > ' + s.slide + ":first-child").addClass('active');
			s.container.find(s.slideNav + ' ' + s.navBtns.slide + ":first-child").addClass('active');
						
			// Start auto rotate
			if (s.auto) {
				$(function(){
					methods.autoRotate('start');
				});
			}
		},	// init method
		autoRotate : function (action) {
			var s = methods.s;
			if(action == 'pause') {
				clearInterval(auto);
			} else {
				auto = window.setInterval( function() {
					if (s.carousel) {
						methods.shiftCarousel('right');
					} else {
						methods.nextSlide('right');
					}
				}, s.delay);
	  			if (s.progress) {
					methods.progress();
				}
			}
		},
		animateProgress : function (action) {
			$('.progress .bar').stop().width('0%');
			if(action != 'pause') {
				$('.progress .bar').animate({
					width: '100%'
				}, {
					duration: s.delay, 
					easing: 'linear',
					queue: false
				});
			}
		},
		shiftCarousel : function (direction) {
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
		},
		nextSlide : function (direction) {
			var s = methods.s, currentSlide = s.container.find(s.slideHolder + ' > ' + s.slide + '.active').index(), nextSlide, animateFrom, animateTo;
			s.isAnimating = 1;
			if(typeof direction === 'number') {
				nextSlide = direction;
				direction = (nextSlide > currentSlide) ? 'right' : 'left';
			}
			if (direction == 'right') {
				if (typeof nextSlide !== 'number') {
					nextSlide = (currentSlide == (s.slideCount() - 1)) ? 0 : currentSlide + 1;
				}
				animateFrom = s.slideWidth();
				animateTo = '-=' + s.slideWidth();
			} else {
				if (typeof nextSlide !== 'number') {
					nextSlide = (currentSlide == 0) ? s.slideCount() - 1 : currentSlide - 1;
				}
				animateFrom = -s.slideWidth();
				animateTo = '+=' + s.slideWidth();
			}
			// Animate next slide
			s.container.find(s.slideHolder + ' > ' + s.slide +  ':eq(' + nextSlide + ')')
			  .css('left',animateFrom)
			  .show()
			  .animate({
			  		left: animateTo
			    }, s.speed, 
			    function() {
				    $(this).addClass('active');
				    s.isAnimating = 0;
				    s.container.find(s.slideNav + ' ' + s.navBtns.slide + ":eq(" + nextSlide + ")").addClass('active').siblings().removeClass('active');
			  });
			// Animate active slide
			s.container.find(s.slideHolder + ' > ' + s.slide + '.active').animate({
			    left: animateTo
			  }, s.speed, function() {
			    $(this).removeClass('active').hide();
				s.container.trigger('activeSlide');
			});
	  		if (s.progress) {
				$('.progress .bar').stop();
		  		progress();
			}
		},
		currentSlide : function () {
			var s = $(this).data('s');
			return s.container.find(s.slideHolder + ' > ' + s.slide + '.active').index() + 1;
		},
		navCheck : function() {
			var s = methods.s;
			// Hide nav when only one image or nav is disabled
			if (s.slideCount() == 1 || s.nav == false) {
				s.container.find(s.arrowsWrap + ',' + s.slideNav).hide();
			} else {
				// Create nav buttons
				s.container.find(s.arrowsWrap + ',' + s.slideNav).show();
				for(var i = 0; i < s.slideCount(); i++) {
					s.container.find(s.slideNav).append("<" + s.navBtns.slide + " data-slide-id='" + i + "' href='#'>" + i + "</" + s.navBtns.slide + ">");
				}
			}
		},
		bindEvents : function () {
			var s = methods.s;
			s.container.find(s.navBtns.right).click(function(e){
				if(!s.isAnimating) {
					e.preventDefault();
					if (s.carousel == true) {
						methods.shiftCarousel('right');
					} else {
						methods.nextSlide('right');
					}
					if (s.auto) {
						clearInterval(auto);
						methods.autoRotate();
					}
				}
			});
			s.container.find(s.navBtns.left).click(function(e){
				if(!s.isAnimating) {
					e.preventDefault();
					if (s.carousel == true) {
						methods.shiftCarousel('left');
					} else {
						methods.nextSlide('left');
					}
					if (s.auto) {
						clearInterval(auto);
						methods.autoRotate();
					}
				}
			});
			s.container.find(s.slideNav).children().click(function(e){
				if(!s.isAnimating && !$(this).hasClass('active')) {
					e.preventDefault();
					methods.nextSlide(parseInt($(this).attr('data-slide-id')));
				}
			});
			if (s.pause) {
  				s.container.find(s.slide).hover(function(){ 
  					methods.autoRotate('pause');
  					if (s.progress) {
  						methods.progress('pause');
  					}
  				}, function() {
  					methods.autoRotate();
  				});
			}
		}

	};
	
	$.fn.tinySlider = function( method ) {
		
		if ( methods[method] ) {
	      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( (typeof method === 'object' || ! method) && $(this).length > 0) {
	      return methods.init.apply( this, arguments );
	    }
		
	};
})( jQuery );