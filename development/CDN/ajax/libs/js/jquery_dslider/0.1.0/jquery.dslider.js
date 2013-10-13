/**
 * Statement: Just shut the fuck up!In case you hadn’t noticed, I’m a bit of a stickler for terminology.You motherfucker!!!
 * 
 * Describe: jQuery D-Silder Plugin.
 * 
 * Further changes, comments: ~
 * 
 * Docs: ~
 * 
 * Original Author: Doris ( Zhang Xiaolu ).
 * 
 * Version: 0.1.0
 * 
 * Creation Date: 2013.10.13 16:46 ( Doris ).
 * 
 * Last update: 2013.10.13 17:36 ( Doris ).
 * 
 * License: ~
 * 
 * Copyright: ~
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

} ('DSlider', function (SJ) {
	
	// See http://bugs.jquery.com/ticket/13335
	'use strict';

	var $ = SJ,

		pluginName = 'sliderbar',

		thisPlugin = {},

		sliderWidth = $(window).width();

	var defaults = {

		onceSpeed: 300,

		autoSpeed: 2000,

		start: 1 //1,2,3,4  按钮序号

	};

	thisPlugin.Class = function (obj, options) {

		this.items = obj;

		this.opts = $.extend({}, defaults, options);

 		this.init();

	};

	thisPlugin.Class.prototype.init = function () {

		var $this = $(this.items);

		thisPlugin.setup($this, this.opts);

	};

	thisPlugin.setup = function (obj, opts) {

		var count = obj.find('li').length,

			btnBox = $('<div/>'),

			btnBoxWrapper = $('<div/>'),

			ulObj = obj.find('ul'),

			$this = this,

			btn = null,

			sliderWidth = obj.width();

		this.data = $.data(this);

		$.data(this, "current", opts.start - 1);

		$.data(this, "count", count);

		$.data(this, "sliderWidth", sliderWidth);

		obj.find('li').eq(this.data.current).css({

			display: 'block',

			zIndex: 10

		});

		btnBoxWrapper.addClass('sliderBtnWrapper').insertAfter(ulObj);

		btnBox.addClass('sliderBtnBox').appendTo('.sliderBtnWrapper');

		$.each(new Array(count), function (i) {

			btn = $('<a/>', {

				href: '#',

				"data-btn-item": i

			}).addClass('sliderBtn').appendTo($('.sliderBtnBox'));

			return btn.on('click', function (e) {

				e.preventDefault();

				return thisPlugin.slide(obj, opts, parseInt($(e.currentTarget).attr('data-btn-item')));

			});

		});

		thisPlugin.autoSlider(obj, opts);

		$(window).on('resize', function () {

			return thisPlugin.update(obj);

		});

		thisPlugin.setActive();

	};

	thisPlugin.setActive = function (number) {

		var current;

		current = number >= 0 ? number : this.data.current;

		$('.active').removeClass('active');

		return $('.sliderBtn').eq(current).addClass('active');

	};

	thisPlugin.update = function (obj) {

		var sliderWidth = null;

		obj.find('li').not(":eq(" + this.data.current + ")").css({

			display: 'none',

			left: 0,

			zIndex: 0

		});

		this.data.sliderWidth = $(window).width();

		return obj.css({

			width: sliderWidth

		});

	};

	thisPlugin.slide = function (obj, opts, number) {

		var currentSlide,

			value,

			direction,

			next,

			$this = this,

			sliderWidth = this.data.sliderWidth,

			ulObj = obj.find('ul');

		if (number !== this.data.current) {

			currentSlide = this.data.current;

			value = number > currentSlide ? 1 : -1;

			direction = number > currentSlide ? -sliderWidth : sliderWidth;

			next = number;

			thisPlugin.setActive(next);

			obj.find('li').not(":eq(" + this.data.current + ")").css({

				display: 'none',

				left: 0,

				zIndex: 0

			});

			obj.find('li').eq(next).css({

				display: 'block',

				left: value * this.data.sliderWidth,

				zIndex: 10

			});

			ulObj.stop().animate({

				left: direction

			}, opts.onceSpeed, (function () {

				ulObj.css({left:0});

				ulObj.find('li').eq(next).css({left:0});

				return ulObj.find('li').eq(currentSlide).css({

					display: 'none',

					left: 0,

					zIndex: 0

				}, $.data($this, "current", next));

			}));

		}

	};

	thisPlugin.autoSlider = function (obj, opts) {

		var count = this.data.count,

			i = this.data.current,

			requestId,

			timer;

		var auto = function () {

			setTimeout(function () {

				i < count - 1 ? i++ : i = 0;

				$('.sliderBtn').eq(i).trigger('click');

			}, opts.onceSpeed)

		};

		obj.stop().on('mouseover', function (e) {

			clearInterval(timer);

		}).on('mouseleave', function (e) {

			timer = setInterval(auto, opts.autoSpeed);

		}).trigger('mouseleave');

	};

	$.fn[pluginName] = function (options) {

		return this.each(function () {

 			if (!$.data(this, pluginName)) {

 				$.data(this, pluginName, new thisPlugin.Class(this, options));

 			}

 		});

	};

}));