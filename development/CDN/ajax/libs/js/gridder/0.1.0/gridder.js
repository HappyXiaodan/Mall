/**
 * Statement: Just shut the fuck up!In case you hadn’t noticed, I’m a bit of a stickler for terminology.You motherfucker!!!
 * 
 * Describe: Gridder.It is an excellent tool for any web developer/designer that wants to easily align, match and lay out websites.
 * 
 * Further changes, comments: ~
 * 
 * Docs: ~
 * 
 * Original Author: Tony ( Shen Weizhong ).
 * 
 * Version: 0.1.0
 * 
 * Creation Date: 2013.09.30 10:16 ( Tony ).
 * 
 * Last update: 2013.10.02 15:33 ( Tony ).
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
	
	// See http://bugs.jquery.com/ticket/13335
	'use strict';

	var settings = {
		
		excute: true,
		
		active: false,
		
		size: 1200,
		
		columns: 12,
		
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
			SJ('<div></div>').addClass('gridPanel').addClass(settings.gutterBgClass).addClass('opacityHalf').css('width', settings.size).appendTo('body');
			
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
		 * @param options
		 * All css attributes that should be set to this object
		 */
		
	    gridderConstructor.prototype._createEntity = function (options) {
			
			SJ('<div>&nbsp;</div>').css(options).addClass(settings.gridBgClass).addClass('gradientFilter').appendTo('.gridPanel');
			
		};
		
		
		
		/* 
		 * Simple Animation.
		 */
		
		gridderConstructor.prototype.setupWindow = function () {
			
			// Get initial document height
			settings.height = SJ(document).height();
			
			var slideOpts = {
					
					duration: 1000,
					
					easing: 'easeOutCirc'
					
				},
				
				shortStatus = false,
				
				showActive = settings.active ? true : false,
				
				slideGrid = function (obj, direc1, direc2) {
					
					if (!shortStatus) {
						
						direc1 == 'show' ? obj.slideDown(slideOpts) : obj.slideUp(slideOpts);
						
						shortStatus = true;
						
					} else {
						
						direc2 == 'hide' ? obj.slideUp(slideOpts) : obj.slideDown(slideOpts);
						
						shortStatus = false;
						
					}
					
				};
			
			keyboard.bind('g', function() {
				
				var obj = SJ('.gridPanel');
				
				if (!showActive) {
					
					slideGrid(obj, 'show', 'hide');
					
				} else {
					
					slideGrid(obj, 'hide', 'show');
					
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