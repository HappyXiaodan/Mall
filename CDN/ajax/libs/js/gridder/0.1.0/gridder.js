/*!
 * Release: 1.3.1 2009-04-26
 */

/*!
 * Copyright (c) Andr�e Hansson (peolanha AT gmail DOT com)
 * MIT License - http://www.opensource.org/licenses/mit-license.php
 * Idea loosely based on JASH, http://billyreisinger.com/jash/
 *
 * Website: http://gridder.andreehansson.se/
 *
 * Changelog:
 * - New GUI! The new GUI should be less obtrusive and has been repositioned.
 *   It is also featuring a slight delay on inputs so that you'll have a chance
 *   to change the settings before it is re-rendering the grid
 * - Due to a lot of inquries regarding affiliation with jQuery the filenames has
 *   been changed, I'm very sorry for the inconvenience!
 * - CSS issues with the GUI should also be fixed in more websites, please report
 *   in any issue you stumble upon
 * - A small bug in IE that made the paragraph lines not position correctly has been
 *   fixed
 * - A dropdown box has replaced the columns input box, 960 Gridder calculates the
 *   proper number of columns that can be used with the specified grid width
 * - The 960 Gridder is now displaying perfectly (into the very pixels) in all
 *   A-grade browsers (according to browsershots.org)
 * - An option to invert the gutters has been added, set this to 'true' if
 *   you want to use it, OR use the shortcut CTRL+ALT+A
 * - Some other minor changes...
 */

/* Create an instance of the Gridder,
 * everything inside is relative to this object.
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
		
		define([
			
			'jquery',
			
			'cdnjs/jquery_easing/1.3/jquery.easing.min',
			
			'cdnjs/mousetrap/1.4.5/mousetrap.min',
			
			'cdnjs/jquery_migrate/1.2.1/jquery.migrate'
			
		], theModule);
		
	} else if ( hasExports ) { // Node.js Module (commonjs compatible)
		
		module.exports = theModule;
		
	} else { // Assign to common namespaces or simply the global object (window)
		
		(this.jQuery || this.ender || this.$ || this)[name] = theModule();
		
	}
	
} ('gridder', function (SJ, easing, keyboard) {

	'use strict';

	var settings = {
		
		excute: true,
		
		active: false,
		
		size: 1200,
		
		columns: 16,
		
		opacity: 1,
		
		margin: 15,
		
		gridBgClass: 'flatYellowBoxGradient', /* pinkBoxGradient, flatYellowBoxGradient, blueBoxGradient */
		
		gutterBgClass: '',
		
		rowHeight: 30,
		
		rowOpacity: 1,
		
		center: true
		
	};
	
	var gridder = (function() {
		
		
		
		/**
		 * Constructor body.
		 */
		
	    var gridderConstructor = function () {
			
	    	this.init();
	        
	    };
		
		
		
		/* Main method, at least visually. It'll create (and remove existing)
		 * grid on the website.
		 */
		
		gridderConstructor.prototype.createGrid = function () {
			
			// Create a object that'll help us control the grid objects
			SJ('<div></div>').addClass('gridPanel').addClass(settings.gutterBgClass).css('width', settings.size).appendTo('body');
			
			// Center our grid if specified to do so
			SJ('.gridPanel').css({
				
				left: '50%',
				
				marginLeft: -((settings.size / 2))
				
			});
			
			if (!settings.active) {
				
				SJ('.gridPanel').addClass('hide');
				
			}
			
			// Create vertical columns
			if (settings.excute && settings.columns > 0) {
				
				var gridPanelWidth = settings.size,
					
					columns = settings.columns,
					
					margin = settings.margin,
					
					gutterNum = columns * 2,
					
					allGutterWidth = margin * gutterNum,
					
					columnWidth = (gridPanelWidth - allGutterWidth) / columns;
				
				for (var i = 0; i < columns; i++) {
					
					this._createEntity({
						
						marginLeft: margin,
						
						marginRight: margin,
						
						width: columnWidth,
						
						height: settings.height
						
					});
					
				}
				
			}
			
		};
		
		
		
		/* Internal method to create an grid entity.
		 * @param type
		 * Either 'vertical' or 'horizontal'
		 * @param options
		 * All css attributes that should be set to this object
		 */
		
	    gridderConstructor.prototype._createEntity = function (options) {
			
			SJ('<div>&nbsp;</div>').css(options).addClass(settings.gridBgClass).addClass('gradientFilter').appendTo('.gridPanel');
			
		};
		
		
		
		/* Create Setup Window for 960 Gridder and hook all of its functions
		 * and stuff. This could theoretically be without its own method, but to
		 * safe-guard the loading of jQuery before running this made me solve the
		 * issue by wrapping it in an own method.
		 */
		
		gridderConstructor.prototype.setupWindow = function () {
			
			// Get initial document height
			settings.height = SJ(document).height();
			
			var slideOpts = {
				
				duration: 1000,
				
				easing: 'easeOutCirc'
				
			};
			
			var shortStatus = false;
			
			var showActive = settings.active ? true : false;
			
			var slideGrid = function (obj, direc1, direc2) {
				
				if (!shortStatus) {
					
					direc1 == 'up' ? obj.slideDown(slideOpts) : obj.slideUp(slideOpts);
					
					shortStatus = true;
					
				} else {
					
					direc2 == 'down' ? obj.slideUp(slideOpts) : obj.slideDown(slideOpts);
					
					shortStatus = false;
					
				}
				
			};
			
			keyboard.bind('ctrl+shift+s', function() {
				
				var obj = SJ('.gridPanel');
				
				if (!showActive) {
					
					slideGrid(obj, 'up', 'down');
					
				} else {
					
					slideGrid(obj, 'down', 'up');
					
				}
				
			});
			
		};
		
		
		
		/**
		 * Constructor initialization.
		 */
		
		gridderConstructor.prototype.init = function () {
			
			this.setupWindow();
			
			this.createGrid();
			
		};
		
		
		
		/**
		 * Enforces new instance.
		 */
		
        if (!(this instanceof gridderConstructor)) {
			
            return new gridderConstructor();
			
        }
		
	    return gridderConstructor;
		
	}());

	return gridder;

}));