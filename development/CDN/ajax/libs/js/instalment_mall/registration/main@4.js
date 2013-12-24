/**
 * Statement: Just shut the fuck up!In case you hadn’t noticed, I’m a bit of a stickler for terminology.You motherfucker!!!
 * 
 * Describe: The javascript boot file of third registration progress page ( ~/registration/index@4.html ).
 * 
 * Further changes, comments: 
 * 
 * Docs: 
 * 
 * Original Author: Tony Stark ( Shen Weizhong ).
 * 
 * Thanks: 
 * 
 * Version: 0.1.0-alpha
 * 
 * Creation Date: 2013.10.30 16:57 ( Tony ).
 * 
 * Last update: 2013.11.23 18:56 ( Tony ).
 * 
 * Music ( Custom ): That High (feat. Kelly Rowland) - Pitbull.mp3, Young In America - Dainelle Bradbery.mp3
 * 
 * License: 
 * 
 * Copyright: 
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
			
			'cdnjs/jquery_validation/1.11.1/jquery.validate.min',
			
			'cdnjs/gridder/0.1.0/gridder.min',
			
			'cdnjs/jquery_title_modify/title.modify.min'
		
		], function (modernizr, SJ, cookie, sl, Hawaii, gridder, modifyTitle) {
			
			SJ(function ($) {
				
				$('.slt').slt({
					
					sldSpeed: 100,
					
					arwSpeed: 100,
					
					effect: 'swing',
					
					form: '#frmBasicInfo'
					
				});
				
				$.validator.setDefaults({
					
					debug: true,
					
					onfocusout: function(element) {
						
						SJ(element).valid();
						
					},
					
					onkeyup: function(element) {
						
						SJ(element).valid();
						
					},
					
					success: function(error) {
						
						SJ(error).remove();
						
					}
					
				});

				$.validator.addMethod("nowhitespace", function(value, element) {
					
					return this.optional(element) || /^\S+$/i.test(value);
					
				}, "不允许有空格。");
				
				$.validator.addMethod("Chinses", function(value, element) {
					
					return this.optional(element) || /[^x00-xff]/.test(value);
					
				}, "请输入中文。");
				
				$.validator.addMethod("email2", function(value, element, param) {
					
					return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
					
				}, $.validator.messages.email);

				$.validator.addClassRules({
					
					userName: {
						
						required: true,
						
						Chinses: true,
						
						nowhitespace: true
						
					},

					oglSltIdentity: { // 身份
						
						required: true

					},
					
					userIdentity: { // 身份证号码
						
						required: true,
						
						nowhitespace: true
						
					},

					oglSltDateYear: {
						
						required: true

					},
					
					identityEmail: {
						
						required: true,
						
						nowhitespace: true,
						
						email: true
						
					}
					
				});

				var _validator = $('#frmBasicInfo').validate({

					errorElement: 'div',

					errorPlacement: function (error, element) {

						switch (SJ(element).attr('id')) {
							
							case 'userName': {
								
								SJ(error).addClass('absol valierror errPos1 box_round');
								
								SJ(element).parent().append(error);
								
								break;
								
							}

							case 'oglSltIdentity': {
								
								SJ(error).addClass('sltError errPos2');
								
								SJ(element).closest('.slt_container').append(error);

								break;

							}
							
							case 'userIdentity': {
								
								SJ(error).addClass('absol valierror errPos3 box_round');
								
								SJ(element).parent().append(error);
								
								break;
								
							}

							case 'oglSltDateYear': {
								
								SJ(error).addClass('sltError errPos4');
								
								SJ(element).closest('.slt_container').append(error);

								break;

							}
							
							case 'identityEmail': {
								
								SJ(error).addClass('absol valierror errPos6 box_round');
								
								SJ(element).parent().append(error);
								
								break;
								
							}
							
						}

					},

					submitHandler: function (form, event) {

						//, 'cdnjs/modernizr_amd/modernizr.min'

					}

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
		
		jq1x: 'ajax/libs/js/jquery/1.10.2/jquery.min',
		
		jq2x: 'ajax/libs/js/jquery/2.0.3/jquery.min'
		
	});
	
}(window, document, requirejs, require));