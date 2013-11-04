/**
 * Statement: Just shut the fuck up!In case you hadn’t noticed, I’m a bit of a stickler for terminology.You motherfucker!!!
 * 
 * Describe: The javascript boot file of sixth registration progress page ( ~/registration/index@4.html ).
 * 
 * Further changes, comments: ~
 * 
 * Docs: ~
 * 
 * Original Author: Tony ( Shen Weizhong ).
 * 
 * Version: 0.1.0
 * 
 * Creation Date: 2013.11.04 13:16 ( Tony ).
 * 
 * Last update: 2013.11.04 13:16 ( Tony ).
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
                        
            baseUrl: '//resource.fenqimall.com/ajax/libs',
			
			enforceDefine: false,
			
			paths: {
				
				'jquery': jquery,
				
				'cdnjs': 'js'
				
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
			
			'cdnjs/gridder/0.1.0/gridder',
			
			'cdnjs/jquery_title_modify/title.modify'
		
		], function (modernizr, SJ, cookie, gridder, modifyTitle) {
			
			SJ(function ($) {
				
				
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
        
        jq1x: '//resource.fenqimall.com/ajax/libs/js/jquery/1.10.2/jquery.min',
        
        jq2x: '//resource.fenqimall.com/ajax/libs/js/jquery/2.0.3/jquery.min'
		
	});
		
}(window, document, requirejs, require));