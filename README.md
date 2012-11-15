2a-slider
=========

Bare Bones jQuery Element Slider

## Description

The slider is a minimalistic approach to jQuery image sliding. Instead of generating a bunch of code and forcing the developer to override it with styles, it simply adds the sliding functionality and relies on the developer to write the proper styling. The only markup generated is the numbered page numbers, which can easily be styled however you like.

## Usage

This plugin accepts many options allowing you to customize it's performance and use your own markup.

```html
$('#slider').tinySlider();
```

## Options
		
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