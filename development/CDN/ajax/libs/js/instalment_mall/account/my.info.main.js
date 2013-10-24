/**
 * Statement: gehen zum Teufel.
 * 
 * Describe: The javascript boot file of account page (account/index.html).
 * 
 * Further changes, comments: ~
 * 
 * Docs: ~
 * 
 * Original Author: Doris.
 * 
 * Version: 0.1.0
 * 
 * Creation Date: 2013.10.18 17:07 ( Doris ).
 * 
 * Last update: 2013.10.19 11:04 ( Doris ).
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
			
			'cdnjs/gridder/0.1.0/gridder',
			
			'cdnjs/jquery_title_modify/title.modify'
		
		], function (modernizr, SJ, cookie, gridder, modifyTitle) {
			
			SJ(function ($) {
				
				var nav = $("nav");
				
				
				
				/**
				 * Navigation Demo.
				 */
				
				nav.find('a').on('click', function () {
					
					$(this).addClass('selected').closest('li').siblings().children().removeClass('selected');
					
				});
                    
                    
                

                /**
                 * Set side bar height.
                 */

				var docHeight = $(document).height(),
                    
					headerHeight = $('header').height();

				$('.leftSidebar').css({
                    
					"height": docHeight-headerHeight
                    
				});



				/**
				 * Basic file upload logic.
				 */

				$('.closeInfoTip').on('click', function (e) {
                    
					e.preventDefault();
                    
					$('.myInfoTip').hide();
                    
				});
                
				var uploadMethod = {
                    
					uploadImg: function (uploadLinkObj, inputObj) {
                        
						$('.' + uploadLinkObj).on('click', function (e) {
                            
							e.preventDefault();
                            
							$('#' + inputObj).trigger('click');
                            
						});
                        
					},
                    
					deletImg: function (delLinkObj, imgObj, putLinkObj, inputObj) {
                        
						if ($('.' + imgObj).length) {
                            
							$('.' + delLinkObj).on('click', function (e) {
                                
								e.preventDefault();
                                
								if (!$('.' + putLinkObj).length) {
                                    
									$('.' + imgObj).parent().html("未上传 <a href=\"#\" class=\"" + putLinkObj + "\">点击上传</a>");
                                    
									uploadMethod.uploadImg(putLinkObj, inputObj);
                                    
								}
                                
							});
                            
						} else {
                            
							uploadMethod.uploadImg(putLinkObj, inputObj);
                            
						}
                        
					}
                    
				};
                
				uploadMethod.uploadImg('uploadIdentFrontLink', 'uploadIdentFront');
                
				uploadMethod.deletImg('delIdentFront', 'identImgFront', 'putIdentFront', 'uploadIdentFront');
                
				uploadMethod.uploadImg('uploadIdentBackLink', 'uploadIdentBack');
                
				uploadMethod.deletImg('delIdentBack', 'identImgBack', 'putIdentBack', 'uploadIdentBack');
                
				uploadMethod.uploadImg('uploadStudentCardLink', 'uploadStudentCard');
                
				uploadMethod.deletImg('delStudentCard', 'studentCard', 'putStudentCard', 'uploadStudentCard');
                
				uploadMethod.uploadImg('uploadSchoolCardLink', 'uploadSchoolCard');
                
				uploadMethod.deletImg('delSchoolCard', 'schoolCard', 'putSchoolCard', 'uploadSchoolCard');
                
                
				
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
		
		jq1x: 'ajax/libs/js/jquery/1.10.2/jquery.min',
		
		jq2x: 'ajax/libs/js/jquery/2.0.3/jquery.min'
		
	});
		
}(window, document, requirejs, require));