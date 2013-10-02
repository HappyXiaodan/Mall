/**
 * Statement: In case you hadn’t noticed, I’m a bit of a stickler for terminology.You motherfucker!!!
 * 
 * Describe: Easing functions specify the speed at which an animation progresses at different points within the animation.
 * 
 * Further changes, comments: http://gsgd.co.uk/sandbox/jquery/easing/
 * 
 * Docs: http://gsgd.co.uk/sandbox/jquery/easing/
 * 
 * Original Author: GSGD, Tony ( Shen Weizhong ).
 * 
 * Version: 1.3
 * 
 * Last update: 2012.11.07 ( original ), 2013.09.30 10:11 ( Tony ).
 * 
 * License: Open source under the BSD License.
 * 
 * Copyright: Copyright @ 2008 George McGinley Smith.All rights reserved.
 */

(function (name, factory) {
	
	// See http://bugs.jquery.com/ticket/13335
	'use strict';
	
	var theModule = factory,
		
		// this is considered "safe":
		hasDefine = typeof define === "function" && define.amd,
		
		// hasDefine = typeof define === "function",
		hasExports = typeof module !== "undefined" && module.exports;
		
	if ( hasDefine ){ // AMD Module
		
		define(['jquery'], theModule);
		
	} else if ( hasExports ) { // Node.js Module (commonjs compatible)
		
		module.exports = theModule;
		
	} else { // Assign to common namespaces or simply the global object (window)
		
		(this.jQuery || this.ender || this.$ || this)[name] = theModule();
		
	}
	
} ('easing', function (SJ) {
	
	// See http://bugs.jquery.com/ticket/13335
	'use strict';
	
	SJ.easing['jswing'] = SJ.easing['swing'];
	
	SJ.extend(SJ.easing, {
		
		def: 'easeOutQuad',
		
		swing: function (x, t, b, c, d) {
			
			return SJ.easing[SJ.easing.def](x, t, b, c, d);
			
		},
		
		easeInQuad: function (x, t, b, c, d) {
			
			return c * (t /= d) * t + b;
			
		},
		
		easeOutQuad: function (x, t, b, c, d) {
			
			return -c * (t /= d) * (t - 2) + b;
			
		},
		
		easeInOutQuad: function (x, t, b, c, d) {
			
			if ((t /= d / 2) < 1) return c / 2 * t * t + b;
			return -c / 2 * ((--t) * (t - 2) - 1) + b;
			
		},
		
		easeInCubic: function (x, t, b, c, d) {
			
			return c * (t /= d) * t * t + b;
			
		},
		
		easeOutCubic: function (x, t, b, c, d) {
			
			return c * ((t = t / d - 1) * t * t + 1) + b;
			
		},
		
		easeInOutCubic: function (x, t, b, c, d) {
			
			if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t + 2) + b;
			
		},
		
		easeInQuart: function (x, t, b, c, d) {
			
			return c * (t /= d) * t * t * t + b;
			
		},
		
		easeOutQuart: function (x, t, b, c, d) {
			
			return -c * ((t = t / d - 1) * t * t * t - 1) + b;
			
		},
		
		easeInOutQuart: function (x, t, b, c, d) {
			
			if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
			return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
			
		},
		
		easeInQuint: function (x, t, b, c, d) {
			
			return c * (t /= d) * t * t * t * t + b;
			
		},
		
		easeOutQuint: function (x, t, b, c, d) {
			
			return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
			
		},
		
		easeInOutQuint: function (x, t, b, c, d) {
			
			if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
			
		},
		
		easeInSine: function (x, t, b, c, d) {
			
			return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
			
		},
		
		easeOutSine: function (x, t, b, c, d) {
			
			return c * Math.sin(t / d * (Math.PI / 2)) + b;
			
		},
		
		easeInOutSine: function (x, t, b, c, d) {
			
			return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
			
		},
		easeInExpo: function (x, t, b, c, d) {
			
			return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
		},
		
		easeOutExpo: function (x, t, b, c, d) {
			
			return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
			
		},
		
		easeInOutExpo: function (x, t, b, c, d) {
			
			if (t == 0) return b;
			if (t == d) return b + c;
			if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
			return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
			
		},
		
		easeInCirc: function (x, t, b, c, d) {
			
			return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
			
		},
		
		easeOutCirc: function (x, t, b, c, d) {
			
			return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
			
		},
		
		easeInOutCirc: function (x, t, b, c, d) {
			
			if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
			return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
			
		},
		
		easeInElastic: function (x, t, b, c, d) {
			
			var s = 1.70158;
			var p = 0;
			var a = c;
			if (t == 0) return b;
			if ((t /= d) == 1) return b + c;
			if (!p) p = d * .3;
			if (a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else var s = p / (2 * Math.PI) * Math.asin(c / a);
			return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			
		},
		
		easeOutElastic: function (x, t, b, c, d) {
			
			var s = 1.70158;
			var p = 0;
			var a = c;
			if (t == 0) return b;
			if ((t /= d) == 1) return b + c;
			if (!p) p = d * .3;
			if (a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else var s = p / (2 * Math.PI) * Math.asin(c / a);
			return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
			
		},
		
		easeInOutElastic: function (x, t, b, c, d) {
			
			var s = 1.70158;
			var p = 0;
			var a = c;
			if (t == 0) return b;
			if ((t /= d / 2) == 2) return b + c;
			if (!p) p = d * (.3 * 1.5);
			if (a < Math.abs(c)) {
				
				a = c;
				var s = p / 4;
				
			} else var s = p / (2 * Math.PI) * Math.asin(c / a);
			if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
			
		},
		
		easeInBack: function (x, t, b, c, d, s) {
			
			if (s == undefined) s = 1.70158;
			
			return c * (t /= d) * t * ((s + 1) * t - s) + b;
			
		},
		
		easeOutBack: function (x, t, b, c, d, s) {
			
			if (s == undefined) s = 1.70158;
			return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
			
		},
		
		easeInOutBack: function (x, t, b, c, d, s) {
			
			if (s == undefined) s = 1.70158;
			if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
			return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
			
		},
		
		easeInBounce: function (x, t, b, c, d) {
			
			return c - SJ.easing.easeOutBounce(x, d - t, 0, c, d) + b;
			
		},
		
		easeOutBounce: function (x, t, b, c, d) {
			
			if ((t /= d) < (1 / 2.75)) {
				
				return c * (7.5625 * t * t) + b;
				
			} else if (t < (2 / 2.75)) {
				
				return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
				
			} else if (t < (2.5 / 2.75)) {
				
				return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
				
			} else {
				
				return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
				
			}
			
		},
		
		easeInOutBounce: function (x, t, b, c, d) {
			
			if (t < d / 2) return SJ.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
			return SJ.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
			
		}
		
	});
	
}));