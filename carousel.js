var carousel3D = function(options) {

	var exports = {},

		settings = {
			rotateDown: 40,
			rotateUp: 38
		},

	// Necessary DOM elements
		container 	 = document.getElementById("carousel-container"),
		carousel  	 = document.getElementById("carousel"),
		images 	  	 = document.querySelectorAll("#carousel > img"),
	
	// Getting properties useful for calculations and initialisation
		containerPaddingTop 	= parseInt(window.getComputedStyle(container).getPropertyValue('padding-top'), 10),
		containerPaddingBottom 	= parseInt(window.getComputedStyle(container).getPropertyValue('padding-bottom'), 10),
		
	// Variable holding the 2D transform with the correct prefix
		supportedTransform = (function() {
	    var prefixes = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' ');
	    var div = document.createElement('div');
	    for(var i = 0; i < prefixes.length; i++) {
	        if(div && div.style[prefixes[i]] !== undefined) {
	            return prefixes[i];
	        }
	    }
	    return false;
	})();

	// Checks if safari is the user agent
	var isUASafari = function () {
		if ((navigator.userAgent.toLowerCase().indexOf('safari') != -1) && (navigator.userAgent.toLowerCase().indexOf('chrome') == -1)) {
			return true;
		} else {
			return false
		}
	};

	// Initialises the settings with options
	exports.init = function(options) {
		if (options && typeof options === "object") {
			for (var prop in options){
				if (prop in settings) {
					settings[prop] = options[prop];
				}
			}
		}
		console.log("carousel initialised");
	}

	// Attaches the numeric properties to the carousel object
	carousel.currentAngle = 0;	
	carousel.incrementAngle = 360 / images.length;
	carousel.translation = ((container.clientHeight)*0.5) / Math.tan( carousel.incrementAngle * (Math.PI/360) );

	// Initialising styles of the different objects
	container.style.paddingTop 	 = isUASafari() ? containerPaddingTop + carousel.translation+ "px" : containerPaddingTop + carousel.translation / 2 + "px";
	container.style.paddingBottom = isUASafari() ? containerPaddingBottom + carousel.translation + "px" : containerPaddingBottom + carousel.translation / 2 + "px";
	carousel.style[supportedTransform] = "translateZ( -" + carousel.translation + "px )";
	carousel.style[supportedTransform + "Origin"] = "50% 50% -" + carousel.translation + "px";

	function addTransform(elem, angle, distance) {
		elem.style[supportedTransform] = "rotateX( " + angle + "deg ) translateZ( " + distance + "px )";
		return elem;
	}
	
	for ( var i = 0 ; i < images.length ; i++ ) {
		addTransform(images[i], carousel.incrementAngle * i, carousel.translation);
		images[i].idNumber = i;
	}


	// Implementing rotation actions

	var yMouse = 0, 	 // y coordinate of the mouse pointer when the event is called
		yTouch = 0,
    	movable = false, // movable is true only when the mouse has been pressed on the container
    	rotationAngle = 0; // variable holding the rotation on the z axis


    // helper function that rotates the carousel based on the movement on screen
    // It also stops the rotation if the endEvent is triggered
    var rotateCarousel = function(targetY, originalY, endEvent) {
    	if (movable) {
    		rotationAngle = 0 - Math.asin((targetY - originalY) / (carousel.translation)) * (180 / Math.PI);
    		addTransform(carousel, rotationAngle, 0 - carousel.translation);
    		document[endEvent] = function() {
    			movable = false; 
    		};
		}
    };

    // On mouse events
    container.addEventListener("mousedown", function(event){
    	event.preventDefault();
    	movable = true;
    	yMouse = event.pageY;
    	container.onmousemove = function(event) {
    		rotateCarousel(event.pageY, yMouse, "onmouseup");
    	};
    });

    // On touch events
    container.addEventListener("touchstart", function(event){
    	event.preventDefault();
    	container.removeEventListener("mousedown");
    	movable = true;
    	yTouch = event.targetTouches[0].pageY;
    	container.ontouchmove = function(event) {
    		rotateCarousel(event.targetTouches[0].pageY, yTouch, "ontouchend");
    	};
    });

    // on key events
    document.addEventListener("keydown", function(event){
    	event.preventDefault();
    	if (event.keyCode === settings.rotateUp) {
    		carousel.currentAngle += carousel.incrementAngle;
    	} else if (event.keyCode === settings.rotateDown) {
    		carousel.currentAngle -= carousel.incrementAngle;
    	}
    	addTransform(carousel, carousel.currentAngle, 0 - carousel.translation);
    });

    return exports;

}();










