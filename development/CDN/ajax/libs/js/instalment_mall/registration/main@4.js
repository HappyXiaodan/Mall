/**
 * Statement: Just shut the fuck up!In case you hadn’t noticed, I’m a bit of a stickler for terminology.You motherfucker!!!
 * 
 * Describe: The javascript boot file of third registration progress page ( ~/registration/index@4.html ).
 * 
 * Further changes, comments: ~
 * 
 * Docs: ~
 * 
 * Original Author: Tony ( Shen Weizhong ).
 * 
 * Version: 0.1.0
 * 
 * Creation Date: 2013.10.30 16:57 ( Tony ).
 * 
 * Last update: 2013.10.30 16:59 ( Tony ).
 * 
 * License: ~
 * 
 * Copyright: ~
 */

(function (window, document, requirejs, require) {
	
	'use strict';
	
	var boot = boot || {};
	
	boot.getAgent = function () {
		
		return navigator.userAgent.toLowerCase();
		
	};
	
	boot.isIE = function(userAgent) {
		
		var agent = userAgent || this.getAgent();
		
		return !!agent.match(/msie/i);
		
	};
	
	boot.isGteIE9 = function(userAgent) {
		
		var agent = userAgent || this.getAgent(),
			
			match = agent.match(/msie\D*([\.\d]*)/i),
			
			version = 0;
		
		if (match && match[1]) {
			
			version = match[1];
			
		}
		
		return version >= 9;
		
	};
	
	boot.req = function (jquery) {
		
		requirejs.config({
			
			baseUrl: '../CDN',
			
			enforceDefine: false,
			
			paths: {
				
				'jquery': jquery,
				
				'cdnjs': 'ajax/libs/js'
				
			},
			
			waitSeconds: 60,
			
			map: {
				
				'*': {'jquery': 'cdnjs/jquery_private/jquery.private.min'},
				
				'cdnjs/jquery_private/jquery.private.min': {'jquery': 'jquery'}
				
			}
			
		});
		
		require([
			
			'cdnjs/modernizr_amd/modernizr.min',
			
			'jquery',
			
			'cdnjs/jquery_cookie/1.3.1/jquery.cookie.min',
			
			'cdnjs/jquery_selector/0.1.0/jquery.selector',
			
			'cdnjs/gridder/0.1.0/gridder.min',
			
			'cdnjs/jquery_title_modify/title.modify.min'
		
		], function (modernizr, SJ, cookie, sl, gridder, modifyTitle) {
			
			SJ(function ($) {

				$('.slt').slt();

				var basiceInfoModule = (function ($, thisModule) {

					var internalProtection = {};

					internalProtection.defaultData = function () {

						

					};

					internalProtection.fnSelector = function () {

						

					};

					internalProtection.clickBtnNext = function () {

						

					};

					thisModule.init = function (opts) {

						var excute = function () {

							internalProtection.defaultData();

							internalProtection.fnSelector();

							internalProtection.clickBtnNext();

						};

						opts.excute ? excute() : console.log('Sorry! Do not have the permission to excute part of program.');

					};

					return thisModule;

				} ($, basiceInfoModule || {}));

				basiceInfoModule.init({excute: true});



				var selectorEd = $('.selectorEd'),
					
					selectorOptions = $('.selectPanel > ul > li'),
					
					tgl = false;
				
				selectorEd.on('click', function () {
					
					var that = $(this),
						
						panel = that.prev('div');
					
					if (!tgl) {
						
						that.addClass('selectorEdOpen');
						
						panel.removeClass('hide');
						
						panel.animate({opacity: 1, top: 25}, {
							
							duration: 400,
							
							done: function () { tgl = true; }
							
						});
						
					}
					
				}).on('click', function () {
					
					var that = $(this),
						
						panel = that.prev('div');
					
					if (tgl) {
						
						that.removeClass('selectorEdOpen');
						
						panel.animate({opacity: 0, top: 35}, {
							
							duration: 400,
							
							done: function () {
								
								panel.addClass('hide');
								
								tgl = false;
								
							}
							
						});
						
					}
					
				});
				
				selectorOptions.on('click', function () {
					
					var that = $(this),
						
						selectedValue = that.text();

					/* Test Script: */ $('#selectorTest').children('option').eq(that.index()).attr('selected', 'true');

					console.log( $('#selectorTest').val());
					
					selectorEd.children('span').text(selectedValue);
					
					selectorEd.children('input').val(selectedValue);
					
					selectorEd.prev('div').animate({opacity: 0, top: 35}, {
						
						duration: 400,
						
						done: function () {
							
							selectorEd.prev('div').addClass('hide');
							
							tgl = false;
							
						}
						
					});
					
				});
				
				
				
				/**
				 * Development dependency: grid system.
				 */
				
				gridder;
				
				
				
				/**
				 * Title modify component( Public ) test.
				 */
				
				modifyTitle();
				
			});
			
		});
		
	};
	
	boot.judgement = function (opts) {
		
		if (this.isIE()) {
			
			this.isGteIE9() ? this.req(opts.jq2x) : this.req(opts.jq1x);
			
		} else {
			
			this.req(opts.jq2x);
			
		}
		
	};
	
	/*             ___   ___
				 \  \  \  \
	   (___)   ___\__\__\__\__
	   (o o)   |  O O O O O O|
	  --\ /----+-------------+-------/
	  |  O                          /
	   \                           /
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ => moo__Steerage ...
	*/
	
	boot.judgement({
		
		jq1x: '//code.jquery.com/jquery-1.11.0-beta2.min',
		
		jq2x: '//code.jquery.com/jquery-2.1.0-beta2.min'
		
	});
		
}(window, document, requirejs, require));