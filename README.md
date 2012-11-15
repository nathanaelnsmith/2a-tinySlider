2a-tinySlider
=========

Bare Bones jQuery Element Slider

## Description

This slider is a minimalistic approach to jQuery image sliding. Instead of generating a bunch of code and forcing the developer to override it with styles, it simply adds the sliding functionality and relies on the developer to write the proper styling. The only markup generated is the numbered pagination, which can easily be styled however you like. The minified script is only 2kb.

## Usage

After you've included jQuery and 2a-slider.js you initialize it as follows.

```html
$('#slider').tinySlider();
```

The following styles are necessary to make it display properly.

```html
.slider {
	width: 980px;
	overflow: hidden;
	position: relative;
}
.slider ul.slides {
	width: 980px;
	height: 380px;
	overflow: hidden;
}
.slider ul.slides li {
	position: absolute;
	top: 0px;
	left: 0px;
	display: none;
}
.slider ul.slides li.active {
	z-index: 1;
	display: block;
}
```

## Options

This plugin accepts many options allowing you to customize it's performance and use your own markup.
		
### slideHolder

The element that holds the slides.
Default: ul

### slide

The slide element.
Default: li

### slideNav

The element that holds the nav page items.
Default: .nav .wrapper

### navBtns {left, right, slide}

The button elements for navigating the slides. Left and right arrows, and nav page items.
Default: a.prev,a.next,a	

### speed

The speed the slides transition.
Default: 200

### auto

Whether you want the slides to rotate automatically.
Default: true

### delay

The pause time between each slide when auto is true.
Default: 6000