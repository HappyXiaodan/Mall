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
				
				var basiceInfoModule = (function ($, thisModule) {
					
					var internalProtection = {},
						
						custom_selector = $('.customSelector'),
						
						ctrlStatus = false,
						
						_validator;
					
					internalProtection.defaultData = function () {
						
						
						
					};
					
					internalProtection.fnSelector = function () {
						
						var shortArray = [],
							
							ctmSltEachFn = function (index) {
								
								var that = $(this),
									
									click_selected = function () {
										
										if (that.hasClass('identitySelector')) {
											
											if (!that.siblings('.valierror').hasClass('hide')) {
												
												that.siblings('.valierror').addClass('hide');
												
											}
											
										} else {
											
											var errorTarget = that.data('target');
											
											if (!that.siblings('.'+errorTarget).hasClass('hide')) {
												
												that.siblings('.'+errorTarget).addClass('hide');
												
											}
											
										}
										
									},
									
									click_option = function () {
										
										shortArray = [];
										
										var _this = $(this),
											
											dataModify = _this.offsetParent().siblings('.slt_selected').children();
										
										if (dataModify.data('modify') == false) {
											
											dataModify.data('modify', true);
											
											console.log(that.find('.slt_selected').children().data('modify'));
											
										}
										
										var invalidCount = _validator.numberOfInvalids();
										
										custom_selector.each(function () {
											
											var _that = $(this);
											
											if (_that.find('.slt_selected').children().data('modify') == false) {
												
												shortArray.push(_that.data('target'));
												
											}
											
										});
										
										if (invalidCount == 0 && shortArray.length == 0) {
											
											$('.basicInfoTool').children('button').removeClass('disable');
											
										}
										
									};
								
								that.find('.slt_selected').on('click.customSelector.yoka', click_selected);
								
								that.find('li').on('click.customSelector.yoka', click_option);
								
							};
						
						$('.slt').slt();
						
						custom_selector.each(ctmSltEachFn);
						
					};
					
					internalProtection.validation = function () {
						
						var _shortArray = [];
							
						$.validator.setDefaults({
							
							debug: true,
							
							onfocusout: function(element) {
								
								_shortArray = [];
								
								SJ(element).valid();
								
								var invalidCount = _validator.numberOfInvalids();
								
								custom_selector.each(function () {
									
									var _that = $(this);
									
									if (_that.find('.slt_selected').children().data('modify') == false) {
										
										_shortArray.push(_that.data('target'));
										
									}
									
								});
								
								if (invalidCount == 0 && _shortArray.length == 0) {
									
									$('.basicInfoTool').children('button').removeClass('disable');
									
								}
								
							},
							
							onkeyup: function(element) {
								
								_shortArray = [];
								
								SJ(element).valid();
								
								var invalidCount = _validator.numberOfInvalids();
								
								custom_selector.each(function () {
									
									var _that = $(this);
									
									if (_that.find('.slt_selected').children().data('modify') == false) {
										
										_shortArray.push(_that.data('target'));
										
									}
									
								});
								
								if (invalidCount == 0 && _shortArray.length == 0) {
									
									$('.basicInfoTool').children('button').removeClass('disable');
									
								}
								
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
							
							userIdentity: {
								
								required: true,
								
								nowhitespace: true
								
							},
							
							identityEmail: {
								
								required: true,
								
								nowhitespace: true,
								
								email: true
								
							}
							
						});
						
						_validator = $('#frmBasicInfo').validate({
							
							errorElement: 'div',
							
							errorPlacement: function (error, element) {
								
								switch (SJ(element).attr('id')) {
									
									case 'userName': {
										
										SJ(error).addClass('absol valierror userNameErrorPos box_round');
										
										SJ(element).parent().append(error);
										
										break;
										
									}
									
									case 'userIdentity': {
										
										SJ(error).addClass('absol valierror uiErrorPos box_round');
										
										SJ(element).parent().append(error);
										
										break;
										
									}
									
									case 'identityEmail': {
										
										SJ(error).addClass('absol valierror iemailErrorPos box_round');
										
										SJ(element).parent().append(error);
										
										break;
										
									}
									
								}
								
							},
							
							submitHandler: function (form, event) {
								
								//form.submit();
								
								custom_selector.each(function (index) {
									
									var that = $(this);
									
									if (that.hasClass('identitySelector')) {
										
										if (!that.siblings('.valierror').hasClass('hide')) {
											
											//console.log('身份未选择。');
											
											return false;
											
										}
										
									} else  if (that.hasClass('identityValiDate')) {
										
										var errorTarget = that.data('target');
										
										if (!that.siblings('.identityValiYearErrorPos').hasClass('hide')) {
											
											//console.log('有效期（年）未选择。');
											
											return false;
											
										} else if (!that.siblings('.identityValiMonthErrorPos').hasClass('hide')) {
											
											//console.log('有效期（月）未选择。');
											
											return false;
											
										} else if (!that.siblings('.identityValiDayErrorPos').hasClass('hide')) {
											
											//console.log('有效期（日）未选择。');
											
											return false;
											
										} else {
											
											form.submit();
											
										}
										
									}
									
								});
								
							}
							
						});
						
					};
					
					internalProtection.clickBtnNext = function () {
						
						var ctmSltEachFn = function (index) {
								
								var that = $(this),
									
									dataArea = that.find('.slt_selected').children(),
									
									defaultValue = dataArea.data('default'),
									
									currentValue = dataArea.text(),
									
									status = (currentValue == defaultValue && dataArea.data('modify') == false);
								
								if (status) {
									
									if (that.hasClass('identitySelector')) {
										
										that.siblings('.valierror').removeClass('hide');
										
									} else {
										
										var errorTarget = that.data('target');
										
										that.siblings('.'+errorTarget).removeClass('hide');
										
									}
									
									ctrlStatus = true;
									
								}
								
							},
							
							click_next = function () {
								
								if (ctrlStatus) {
									
									custom_selector.siblings('.valierror').addClass('hide');
									
								}
								
								custom_selector.each(ctmSltEachFn);
								
							};
						
						$('.basicInfoTool').on('click.custom', 'button', click_next);
						
					};
					
					thisModule.init = function (opts) {
						
						var excute = function () {
							
							internalProtection.defaultData();
							
							internalProtection.fnSelector();
							
							internalProtection.validation();
							
							internalProtection.clickBtnNext();
							
						};
						
						opts.excute ? excute() : console.log('Sorry! Do not have the permission to excute part of program.');
						
					};
					
					return thisModule;
					
				} ($, basiceInfoModule || {}));
				
				basiceInfoModule.init({excute: true});
				
				
				
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