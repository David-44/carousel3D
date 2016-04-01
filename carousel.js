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
	carousel.style[supportedTransform + "Origin"] = "50% 50% -" + carousel.translation + "px";
	carousel.style[supportedTransform] = "translateZ( -" + carousel.translation + "px )";
	container.style.paddingTop 	 = 10 + containerPaddingTop + carousel.translation / 2 + "px";
	container.style.paddingBottom = 10 + containerPaddingBottom + carousel.translation / 2 + "px";
	
	function addTransform(elem, angle, distance) {
		var transformation = "rotateX( " + angle + "deg ) translateZ( " + distance + "px )";
		elem.style[supportedTransform] = transformation;
		return elem;
	}
	
	for ( var i = 0 ; i < images.length ; i++ ) {
		addTransform(images[i], carousel.incrementAngle * i, carousel.translation);
		images[i].idNumber = i;
	}

	// Implementing rotation on mouse drag up or down

	var yMouse = 0, 	 // y coordinate of the mouse pointer when the event is called
    	movable = false; // movable is true only when the mouse has been pressed on the container

    container.addEventListener("mousedown", function(event){
    	event.preventDefault();
    	movable = true;
    	var rotationAngle = 0;
    	yMouse = event.pageY;
    	carousel.onmousemove = function(event) {
    		if (movable) {
	    		rotationAngle = 0 - Math.asin((event.pageY - yMouse) / (carousel.translation)) * (180 / Math.PI);
	    		addTransform(carousel, rotationAngle, 0 - carousel.translation);
	    		document.onmouseup = function() {
	    			movable = false; 
	    		};
    		}
    	};
    });

    // Implementing rotation on mouse key up or down or tab (accessibility)

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









