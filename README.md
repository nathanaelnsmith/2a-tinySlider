2a-tinySlider
=========

A Simple jQuery Element Slider and Carousel

## Description

This slider is a minimalistic approach to jQuery image sliding. Instead of generating code and forcing the developer to accommodate and override it, this plugin simply adds the sliding functionality and relies on the developer to write the proper styling. The only markup generated is the numbered pagination which can be customized with options and styled. The minified script is only 3kb.

## Usage

After you've included jQuery and 2a-slider.js you initialize it as follows. View test.html for default mark up.

```html
$('#slider').tinySlider();
```

The following styles are necessary to make it display properly.

### Slideshow Mode

```html
#slider {
	width: 980px; // Any static width will be fine. This is the frame that holds the sliding elements.
	overflow: hidden;
	position: relative;
}
#slider ul.slides {
	width: 980px;
	height: 380px;
	overflow: hidden;
}
#slider ul.slides li {
	position: absolute;
	top: 0px;
	left: 0px;
	display: none;
}
#slider ul.slides li.active {
	z-index: 1;
	display: block;
}
```

### Carousel Mode

```html
#slider {
	width: 980px; // Any static width will be fine. This is the frame that holds the sliding elements.
	overflow: hidden;
	position: relative;
}
#slider ul.slides {
	height: 380px;
	overflow: hidden;
}
```

## Options

This plugin accepts many options allowing you to customize it's performance and use your own markup.
		
### slideHolder (Default: 'ul')

The element that holds the slides.

### slide (Default: 'li')

The slide element.

### slideNav (Default: '.nav .wrapper')

The element that holds the nav page items.

### arrowsWrap (Default: '.arrows')

The element that holds the nav arrows.

### navBtns {left, right, slide} (Default: 'a.prev', 'a.next', 'a')

The button elements for navigating the slides. Left and right arrows, and nav page items. The slide option is the tag name of the pagination buttons.

### speed (Default: 200)

The speed the slides transition.

### auto (Default: false)

Whether you want the slides to rotate automatically.

### delay (Default: 6000)

The pause time between each slide when auto is true.

### nav (Default: true)

Whether or not you want the nav displayed.

### pause (Default: true)

Pause auto rotate when hovering over a slide.

### progress (Default: false)

Enable a progress bar for auto rotate. Enabling this also enables auto rotate.
Include <div class="progress"><div class="bar"></div></div> in slider container.

### carousel (Default: false)

Enable carousel mode.