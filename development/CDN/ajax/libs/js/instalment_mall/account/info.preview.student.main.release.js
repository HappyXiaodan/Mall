/**
 * Statement: gehen zum Teufel.
 * 
 * Describe: The javascript boot file of student information preview page (~/account/info.preview.student.html).
 * 
 * Further changes, comments: ~
 * 
 * Docs: ~
 * 
 * Original Author: Doris ( Zhang Xiaolu ).
 * 
 * Version: 0.1.0
 * 
 * Creation Date: 2013.10.29 16:27 ( Doris ).
 * 
 * Last update: 2013.10.29 16:27 ( Doris ).
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
				
				var nav = $("nav"),

					statusTip = $('.status').children('div');
				
				
				
				/**
				 * Navigation Demo.
				 */
				
				nav.find('a').on('click', function (e) {
					
					e.preventDefault();
					
					$(this).addClass('selected').closest('li').siblings().children().removeClass('selected');
					
				});




				/**
				 * adaptive height.
				 */

				var docHeight = $(document).height(),

					headerHeight = $('header').height();

				$('.leftSidebar').css({"height": docHeight-headerHeight});



				/**
				 * hover status cell(td), show tip.
				 */

				statusTip.each(function () {

					$(this).on('mouseover', function (e) {

						e.preventDefault();

						$(this).children('div').css('display', 'block');

					}).on('mouseout', function () {

						$(this).children('div').css('display', 'none');

					})

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