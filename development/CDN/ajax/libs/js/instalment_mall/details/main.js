/**
 * Statement: Just shut the fuck up!In case you hadn’t noticed, I’m a bit of a stickler for terminology.You motherfucker!!!
 * 
 * Describe: The javascript boot file of detail page ( ~/details/index.html ).
 * 
 * Further changes, comments: ~
 * 
 * Docs: ~
 * 
 * Original Author: Tony ( Shen Weizhong ).
 * 
 * Version: 0.1.0
 * 
 * Creation Date: 2013.10.14 01:34 ( Tony ).
 * 
 * Last update: 2013.10.25 19:07 ( Tony ).
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

			'cdnjs/jquery_tab/0.1.0/jquery.tab',
			
			'cdnjs/gridder/0.1.0/gridder',

			'cdnjs/jquery_scrollable/0.1.0/jquery.scrollable',
			
			'cdnjs/jquery_title_modify/title.modify'
		
		], function (modernizr, SJ, cookie, gridder, tabs, thumbs, modifyTitle) {
			
			SJ(function ($) {
				
				
				
				/**
				 * Development dependency: grid system.
				 */
				
				gridder;
				
				
				
				/**
				 * Waiting for dealing.
				 */

				$(".scrollable").scrollable({ vertical: true, mousewheel: true });
				
				$("#tabs").tabs("#tabPanes > div");

				$('#rgtTabs').tabs("#rgtTabsPanes > div");
				
				$('.verticalSlide > .vertical > .items > div > .item > img').on('click', function () {
					
					var that = $(this),
						
						zoomPic = that.data('graphic'),

						switchPic = $('.switchScreen > img'),

						baseURL = 'http://resource.fenqimall.com/ajax/libs/ui/mall/details/';

					switchPic.prop('src', baseURL + $.trim(zoomPic));
					
				});

				var recentlyBrowsed = $('#recentlyBrowsedPanel > .recentlyBrowsedPros > div'),

					evenRecentlyBrowsed = $('#recentlyBrowsedPanel > .recentlyBrowsedPros > div:even'),

					oddRecentlyBrowsed = $('#recentlyBrowsedPanel > .recentlyBrowsedPros > div:odd'),

					recentlyBrowsedNum = recentlyBrowsed.length;

				evenRecentlyBrowsed.css({'border-right': '0'});

				oddRecentlyBrowsed.css({'border-right': '1px'});

				if ((recentlyBrowsedNum === 1) || (recentlyBrowsedNum === 3) || (recentlyBrowsedNum === 5)) {

					recentlyBrowsed.last().css({'border-right': '1px solid #d5d5d5', 'border-bottom': '0'});

				}

				if ((recentlyBrowsedNum === 2) || (recentlyBrowsedNum === 4) || (recentlyBrowsedNum === 6)) {

					recentlyBrowsed.last().css({'border-bottom': '0'});

					recentlyBrowsed.last().prev().css({'border-bottom': '0'});

				}
				
				
				
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
		
		jq1x: 'ajax/libs/js/jquery/1.10.2/jquery.min',
		
		jq2x: 'ajax/libs/js/jquery/2.0.3/jquery.min'
		
	});
		
}(window, document, requirejs, require));