# carousel3D
A 3D carousel using CSS 3D transforms and transitions.

The [demo](http://morisset-web.co.uk/3D_carousel/index.html) is here.

This carousel has been inspired by this [awesome tutorial on 3D transforms](http://desandro.github.io/3dtransforms/). 

Since support is far from perfect on 3D transform, this plug-in will require a fallback if used in a production environment.

## Features
* No need for external libraries.
* Easy to style since everything is in the CSS

## Setup

#### Markup
you need that kind of html structure :

```html
  <div class="carousel-container" id="carousel-container">
		<div class="sub-container">
		  <div id="carousel" class="carousel">
				<img src="" alt="description">
				<img src="" alt="description">
				<img src="" alt="description">
				<img src="" alt="description">
				<img src="" alt="description">
				<img src="" alt="description">
				<img src="" alt="description">
				<img src="" alt="description">
				<img src="" alt="description">
				<img src="" alt="description">
		  </div>
	  </div>
	</div>
```

Note that the top level div can be any block level element (section...).

#### CSS

Either link to the file carousel.css in the head of your document or copy its content in your own file.
you can modify the following rules :
* `.carousel-container` : Anything can be changed.
* `.carousel img` : Don't touch the first 5 lines. Also, if modifying the `height` and `top` property, keep in mind that height + 2 top should be equal to 100%.
* `.carousel` and `sub-container` : Do not touch.

#### Javascript
Just link to the file carousel.js at the end of your html page, and that's it.

##### javascript options
At the moment, there are two options that can be modified : the keys used to navigate the carousel. they are set by default to down and up arrow. Here are the options that need to be setup :

```javascript
var carouselOptions = {
  rotateDown: ,       // default code 40 for down arrow
  rotateUp:           // default code 38 for up arrow
}
carousel3D.init(carouselOptions);
```

Keycodes can be found [here](http://keycode.info/).
