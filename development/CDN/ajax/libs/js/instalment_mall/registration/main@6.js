/**
 * Statement: Just shut the fuck up!In case you hadn’t noticed, I’m a bit of a stickler for terminology.You motherfucker!!!
 * 
 * Describe: The javascript boot file of fifth registration progress page ( ~/registration/index@6.html ).
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
			
			'cdnjs/jquery_scroll/0.1.0/jquery.scroll.min',
			
			'cdnjs/jquery_selector/0.1.0/jquery.selector',
			
			'cdnjs/jquery_validation/1.11.1/jquery.validate.min',
			
			'cdnjs/gridder/0.1.0/gridder',
			
			'cdnjs/jquery_title_modify/title.modify'
		
		], function (modernizr, SJ, cookie, scro, sl, Hawaii, gridder, modifyTitle) {
			
			SJ(function ($) {
				
				
				
				var getOfficeInfo = (function ($, thisModule) {
					
					var privateFn,
						
						extendObject,
						
						tgl,
						
						utils,
						
						_validator,
						
						_shortArray,
						
						ctrlStatus,
						
						customSelector = $('.customSelector');
					
					privateFn = privateFn || {};
					
					extendObject = function (ns/*ns: Nested Namespace*/, nsString) {
						
						var part = nsString.split('.'),
							
							parent = ns,
							
							pl;
						
						pl = part.length;
						
						for (var i = 0; i < pl; i++) {
							
							if (typeof parent[part[i]] === 'undefined') {
								
								parent[part[i]] = {};
								
							}
							
						}
						
						return parent;
						
					};
					
					privateFn = extendObject(privateFn, 'privateFn.utils');
					
					privateFn.utils.åüdpControl = function (e) { //dp: preventDefault & stopPropagation.
						
						e.preventDefault();
						
						e.stopPropagation();
						
					};
					
					privateFn.utils.åüstopRightClick = function () {
						
						window.oncontextmenu = function () { // Not compatibile with IE < 9
							
							return false;
							
						};
						
					};
					
					privateFn = extendObject(privateFn, 'privateFn.schoolSwitch');
					
					privateFn.schoolSwitch.åüinit = function () {
						
						this.åütrigger();
						
					};
					
					privateFn.schoolSwitch.åütrigger = function () {
						
						var schoolPanelTrigger = $('.selectorSchool'),
							
							panel = $('.schoolPanel');
						
						var showPanel = function () {
							
							panel.find('.schoolListBox').studioScroll().show();
							
							panel.stop().animate({opacity: 1, top: 302}, {
								
								duration: 100,
								
								done: function () {
									
									tgl = true;
									
								}
								
							}).removeClass('hide');
							
						};
						
						var hidePanel = function () {
							
							panel.find('.schoolListBox').getStudioScroll().hide();
							
							panel.stop().animate({opacity: 0, top: 337}, {
								
								duration: 100,
								
								done: function () {
									
									tgl = false;
									
									panel.addClass('hide');
									
								}
								
							});
							
						};
						
						schoolPanelTrigger.on('click.switch.tony', function () {
							
							!tgl ? showPanel() : hidePanel();
							
						});
						
						$('.closeBtn').on('click.closepanel.tony', hidePanel);
						
						$('.schoolListBox').on('click', 'a', function (e) {
							
							privateFn.utils.åüdpControl(e);
							
							schoolPanelTrigger.children('span').text($(this).text());
							
							if (schoolPanelTrigger.data('modify') == false) {
								
								schoolPanelTrigger.data('modify', true);
								
								console.log(schoolPanelTrigger.data('modify'));
								
							}
							
							/*
							 * Stop for short time.
							 * 
							 *schoolPanelTrigger.css({
								
								'left': '50%',
								
								'margin-left': -($('.selectorSchool').width()/2)
								
							});*/
							
						});
						
					};
					
					privateFn = extendObject(privateFn, 'privateFn.valior');
					
					privateFn.valior.åüinit = function () {
						
						this.åüplugin();
						
						this.åünext();
						
						this.åüoriginal();
						
					};
					
					privateFn.valior.åüplugin = function () {
						
						$.validator.setDefaults({
							
							debug: true,
							
							onfocusout: function(element) {
								
								var invalidCount = _validator.numberOfInvalids();
								
								_shortArray = [];
								
								SJ(element).valid();
								
								customSelector.each(function () {
									
									var _that = $(this);
									
									if (_that.hasClass('selectorSchool')) {
										
										if (_that.data('modify') == false) {
											
											_shortArray.push(_that.attr('class'));
											
										}
										
									} else if (_that.find('.slt_selected').children().data('modify') == false) {
										
										_shortArray.push(_that.data('target'));
										
									}
									
									if (invalidCount == 0 && _shortArray.length == 0) {
										
										$('.infoTool').children('button').removeClass('disable');
										
									} else {
										
										$('.infoTool').children('button').addClass('disable');
										
									}
									
								});
								
								console.log('Invalid count: ' + invalidCount + '. ' + _shortArray);
								
							},
							
							onkeyup: function(element) {
								
								var invalidCount = _validator.numberOfInvalids();
								
								_shortArray = [];
								
								SJ(element).valid();
								
								customSelector.each(function () {
									
									var _that = $(this);
									
									if (_that.hasClass('selectorSchool')) {
										
										if (_that.data('modify') == false) {
											
											_shortArray.push(_that.attr('class'));
											
										}
										
									} else if (_that.find('.slt_selected').children().data('modify') == false) {
										
										_shortArray.push(_that.data('target'));
										
									}
									
									if (invalidCount == 0 && _shortArray.length == 0) {
										
										$('.infoTool').children('button').removeClass('disable');
										
									} else {
										
										$('.infoTool').children('button').addClass('disable');
										
									}
									
								});
								
								console.log('Invalid count: ' + invalidCount + '. ' + _shortArray.length);
								
							},
							
							success: function(error) {
								
								SJ(error).remove();
								
							},
							
							errorElement: 'div'
							
						});
						
						$.validator.addMethod("nowhitespace", function(value, element) {
							
							return this.optional(element) || /^\S+$/i.test(value);
							
						}, "不允许有空格。");
						
						$.validator.addMethod("Chinses", function(value, element) {
							
							return this.optional(element) || /[^x00-xff]/.test(value);
							
						}, "请输入中文。");
						
						$.validator.addClassRules({
							
							company: {
								
								required: true
								
							},
							
							income: {
								
								required: true
								
							},
							
							sector: {
								
								required: true
								
							},
							
							jobTitle: {
								
								required: true
								
							},
							
							comPhoneAreaCode: {
								
								required: true
								
							},
							
							comPhone: {
								
								required: true
								
							},
							
							comAddressDetail: {
								
								required: true
								
							},
							
							homeAddressDetail: {
								
								required: true
								
							},
							
							currAddressDetail: {
								
								required: true
								
							}
							
						});
						
						var fn = function (obj) {
							
							$('.sass').each(function (index) {
								
								if (!$(this).hasClass('hide')) {
									
									console.log(index);
									
									return false;
									
								} else if (index == $('.sass').length - 1) {
									
									console.log(index);
									
									obj.init();
									
								}
								
							});
							
						};
						
						_validator = $('#frmSuppInfo').validate({
							
							errorPlacement: function (error, element) {
								
								switch (SJ(element).attr('id')) {
									
									case 'company': {
										
										SJ(error).addClass('absol textCenter box_round errMsg companyErrorPos');
										
										SJ(element).siblings('.lblComID').append(error);
										
										break;
										
									}
									
									case 'income': {
										
										SJ(error).addClass('absol textCenter box_round errMsg incomeErrorPos');
										
										SJ(element).siblings('.lblIncomeID').append(error);
										
										break;
										
									}
									
									case 'sector': {
										
										SJ(error).addClass('absol textCenter box_round errMsg sectorError');
										
										SJ(element).siblings('.lblSectorID').append(error);
										
										break;
										
									}
									
									case 'jobTitle': {
										
										SJ(error).addClass('absol textCenter box_round errMsg jobError');
										
										SJ(element).siblings('.lblJobID').append(error);
										
										break;
										
									}
									
									case 'comPhoneAreaCode': {
										
										SJ(error).addClass('absol absol textCenter box_round errMsg phoneError areaCodeErrorPos');
										
										SJ(element).siblings('.lblTeleID').append(error);
										
										break;
										
									}
									
									case 'comPhone': {
										
										SJ(error).addClass('absol textCenter box_round errMsg phoneError teleErrorPos');
										
										SJ(element).siblings('.lblTeleID').append(error);
										
										break;
										
									}
									
									case 'comAddressDetail': {
										
										SJ(error).addClass('absol textCenter box_round errMsg comAddError lightGreyBg');
										
										SJ(element).siblings('.lblComAdrID').append(error);
										
										break;
										
									}
									
									case 'homeAddressDetail': {
										
										SJ(error).addClass('absol textCenter box_round errMsg homeDetailAddError lightGreyBg');
										
										SJ(element).siblings('.lblHomeAdrID').append(error);
										
										break;
										
									}
									
									case 'currAddressDetail': {
										
										SJ(error).addClass('absol textCenter box_round errMsg nowAddDetailError lightGreyBg');
										
										SJ(element).siblings('.lblNowAdrID').append(error);
										
										break;
										
									}
									
								}
								
							},
							
							submitHandler: function (form, event) {
								
								var _sub = (function (_mod) {
									
									_mod.init = function () {
										
										console.log('Right.');
										
									};
									
									return _mod;
									
								} (_sub || {}));
								
								fn(_sub);
								
							}
							
						});
						
					};
					
					privateFn.valior.åünext = function () {
						
						var ctmSltEachFn = function (index) {
							
							var that = $(this),
								
								dataArea, defaultValue, currentValue, status;
							
							if (that.hasClass('selectorSchool')) {
								
								var dv = that.data('default'),
									
									cv = that.children('span').text();
								
								if (cv == dv) {
									
									that.siblings('.schoolError').removeClass('hide');
									
								}
								
							} else {
								
								dataArea = that.find('.slt_selected').children();
								
								defaultValue = dataArea.data('default');
								
								currentValue = dataArea.text();
								
								status = (currentValue == defaultValue && dataArea.data('modify') == false);
								
								if (status) {
									
									var errorTarget = that.data('target');
									
									$('.'+errorTarget).removeClass('hide');
									
								}
								
							}
							
						};
						
						$('.infoTool').children('button').on('click.next.tony', function () {
							
							customSelector.each(ctmSltEachFn);
							
						});
						
					};
					
					privateFn.valior.åüoriginal = function () {
						
						customSelector.each(function (index) {
							
							var that = $(this),
								
								selected,
								
								option;
							
							if (that.hasClass('selectorSchool')) {
								
								that.on('click.holy.tony', function () {
									
									if (!that.siblings('.schoolError').hasClass('hide')) {
										
										$(this).siblings('.schoolError').addClass('hide');
										
									}
									
								});
								
							} else {
								
								selected = that.find('.slt_selected');
								
								option = that.find('li');
								
								selected.on('click.slt_selected.tony', function () {
									
									var errorTarget = that.data('target');
									
									if (!$('.'+errorTarget).hasClass('hide')) {
										
										$('.'+errorTarget).addClass('hide');
										
									}
									
								});
								
								option.on('click.options.tony', function () {
									
									var _this = $(this),
										
										dataModify = _this.offsetParent().siblings('.slt_selected').children();
									
									_shortArray  = [];
									
									if (dataModify.data('modify') == false) {
										
										dataModify.data('modify', true);
										
										console.log(that.find('.slt_selected').children().data('modify'));
										
									}
									
									var invalidCount = _validator.numberOfInvalids();
									
									customSelector.each(function () {
										
										var _that = $(this);
										
										if (_that.hasClass('selectorSchool')) {
											
											if (_that.data('modify') == false) {
												
												_shortArray.push(_that.attr('class'));
												
											}
											
										} else if (_that.find('.slt_selected').children().data('modify') == false) {
											
											_shortArray.push(_that.data('target'));
											
										}
										
										if (invalidCount == 0 && _shortArray.length == 0) {
											
											$('.infoTool').children('button').removeClass('disable');
											
										} else {
											
											$('.infoTool').children('button').addClass('disable');
											
										}
										
									});
									
								});
								
							}
							
						});
						
					};
					
					thisModule.init = function () {
						
						$('.slt').slt();
						
						this.utils.åüstopRightClick();
						
						this.schoolSwitch.åüinit();
						
						this.valior.åüinit();
						
					}.bind(privateFn);
					
					return thisModule;
					
				} ($, getOfficeInfo || {})).init();
				
				
				
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