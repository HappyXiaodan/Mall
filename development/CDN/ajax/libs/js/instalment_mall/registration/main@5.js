/**
 * Statement: Just shut the fuck up!In case you hadn’t noticed, I’m a bit of a stickler for terminology.You motherfucker!!!
 * 
 * Describe: The javascript boot file of fourth registration progress page ( ~/registration/index@5.html ).
 * 
 * Further changes, comments: ~
 * 
 * Docs: ~
 * 
 * Original Author: Doris ( Zhang Xiaolu ).
 * 
 * Version: 0.1.0-alpha
 * 
 * Creation Date: 2013.10.30 16:57 ( Doris ).
 * 
 * Last update: 2013.11.04 13:44 ( Tony Stark ).
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
			
			'cdnjs/jquery_validation/1.11.1/jquery.validate.min',
			
			'cdnjs/gridder/0.1.0/gridder',
			
			'cdnjs/jquery_title_modify/title.modify'
		
		], function (modernizr, SJ, cookie, sl, Hawaii, gridder, modifyTitle) {
			
			SJ(function ($) {
				
				$('.selectorSchool').css({
					
					'left': '50%',
					
					'margin-left': -($('.selectorSchool').width()/2)
					
				});
				
				$('.slt').slt();
				
				var getStuInfo = (function ($, thisModule) {
					
					var privateFn,
						
						extendObject,
						
						tgl,
						
						initialization,
						
						utils,
						
						schoolSwitch,
						
						valior,
						
						_validator,
						
						customSelector = $('.customSelector'),
						
						_shortArray,
						
						ctrlStatus;
					
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
					
					tgl = false;
					
					utils = extendObject(privateFn, 'privateFn.utils');
					
					utils.utils.åüdpControl = function (e) { //dp: preventDefault & stopPropagation.
						
						e.preventDefault();
						
						e.stopPropagation();
						
					};
					
					utils.utils.åüstopRightClick = function () {
						
						window.oncontextmenu = function () {
							
							return false;
							
						};
						
					};
					
					utils.utils.åütriggerEvent = function () {}; //Touch device or common device.
					
					schoolSwitch = extendObject(privateFn, 'privateFn.schoolSwitch');
					
					schoolSwitch.schoolSwitch.åüinit = function () {
						
						this.åütrigger();
						
						this.åüdataSwitch();
						
					};
					
					schoolSwitch.schoolSwitch.åütrigger = function () {
						
						var schoolPanelTrigger = $('.selectorSchool'),
							
							panel = $('.schoolPanel');
						
						var showPanel = function () {
							
							panel.stop().animate({opacity: 1, top: 0}, {
								
								duration: 100,
								
								done: function () { tgl = true; }
								
							}).removeClass('hide');
							
						};
						
						var hidePanel = function () {
							
							panel.stop().animate({opacity: 0, top: 35}, {
								
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
							
							utils.utils.åüdpControl(e);
							
							schoolPanelTrigger.children('span').text($(this).text());
							
							if (schoolPanelTrigger.data('modify') == false) {
								
								schoolPanelTrigger.data('modify', true);
								
								console.log(schoolPanelTrigger.data('modify'));
								
							}
							
							$('.selectorSchool').css({
								
								'left': '50%',
								
								'margin-left': -($('.selectorSchool').width()/2)
								
							});
							
						});
						
					};
					
					schoolSwitch.schoolSwitch.åüdataSwitch = function () {
						
						var cityListObj = $('.cityList').find('a'),
							
							areaListObj = $('.areaList').find('a'),
							
							method = {};
						
						method = {
							
							clickEvent: function (obj, className) {
								
								obj.on('click', function (e) {
									
									e.preventDefault();
									
									e.stopPropagation();
									
									obj.parent().removeClass(className);
									
									$(this).parent().addClass(className);
									
								});
								
							}
							
						};
						
						method.clickEvent(cityListObj, 'currentCity');
						
						method.clickEvent(areaListObj, 'currentArea');
						
					};
					
					valior = extendObject(privateFn, 'privateFn.valior');
					
					valior.valior.åüinit = function () {
						
						this.åüplugin();
						
						this.åünext();
						
						this.åüoriginal();
						
					};
					
					valior.valior.åüplugin = function () {
						
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
							
							studentId: {
								
								required: true
								
							},
							
							department: {
								
								required: true
								
							},
							
							major: {
								
								required: true
								
							},
							
							schAddressDetail: {
								
								required: true
								
							},
							
							homeAddressDetail: {
								
								required: true
								
							},
							
							currAddressDetail: {
								
								required: true
								
							}
							
						});
						
						_validator = $('#frmSuppInfo').validate({
							
							errorPlacement: function (error, element) {
								
								switch (SJ(element).attr('id')) {
									
									case 'studentId': {
										
										SJ(error).addClass('absol textCenter box_round errMsg studentIdError errStuBumPos');
										
										SJ(element).siblings('.lblStuID').append(error);
										
										break;
										
									}
									
									case 'department': {
										
										SJ(error).addClass('absol textCenter box_round errMsg depError errDepartPos');
										
										SJ(element).siblings('.lblDeparID').append(error);
										
										break;
										
									}
									
									case 'major': {
										
										SJ(error).addClass('absol textCenter box_round errMsg majorError errStuProPos');
										
										SJ(element).siblings('.lblMajorID').append(error);
										
										break;
										
									}
									
									case 'schAddressDetail': {
										
										SJ(error).addClass('absol textCenter box_round errMsg schAddError errSchAdressPos');
										
										SJ(element).siblings('.lblSchoolAdressID').append(error);
										
										break;
										
									}
									
									case 'homeAddressDetail': {
										
										SJ(error).addClass('absol textCenter box_round errMsg homeAddError errAdressPos');
										
										SJ(element).siblings('.lblHomeAdressID').append(error);
										
										break;
										
									}
									
									case 'currAddressDetail': {
										
										SJ(error).addClass('absol textCenter box_round errMsg homeAddError errNowAdressPos');
										
										SJ(element).siblings('.lblNowAdressID').append(error);
										
										break;
										
									}
									
								}
								
							},
							
							submitHandler: function (form, event) {
								
								customSelector.each(function (index) {
									
									var that = $(this);
									
									if (that.hasClass('selectorSchool')) {
										
										if (!that.siblings('.errMsg').hasClass('hide')) {
											
											//console.log('学校未选择。');
											
											return false;
											
										}
										
									} else {
										
										if (!$('.errEduPos').hasClass('hide')) {
											
											//console.log('在读学历未选择。');
											
											return false;
											
										} else if (!$('.errEduSysPos').hasClass('hide')) {
											
											//console.log('学制未选择。');
											
											return false;
											
										} else if (!$('.errGradePos').hasClass('hide')) {
											
											//console.log('年级未选择。');
											
											return false;
											
										} else if (!$('.errEntranceYearPos').hasClass('hide')) {
											
											//console.log('入学时间（年）未选择。');
											
											return false;
											
										} else if (!$('.errEntranceMonthPos').hasClass('hide')) {
											
											//console.log('入学时间（月）未选择。');
											
											return false;
											
										} else if (!$('.schAdError1Pos').hasClass('hide')) {
											
											//console.log('学校地址（1）未选择。');
											
											return false;
											
										} else if (!$('.schAdError2Pos').hasClass('hide')) {
											
											//console.log('学校地址（2）未选择。');
											
											return false;
											
										} else if (!$('.schAdError3Pos').hasClass('hide')) {
											
											//console.log('学校地址（3）未选择。');
											
											return false;
											
										} else if (!$('.homeAdError1Pos').hasClass('hide')) {
											
											//console.log('家庭地址（1）未选择。');
											
											return false;
											
										} else if (!$('.homeAdError2Pos').hasClass('hide')) {
											
											//console.log('家庭地址（2）未选择。');
											
											return false;
											
										} else if (!$('.homeAdError3Pos').hasClass('hide')) {
											
											//console.log('家庭地址（3）未选择。');
											
											return false;
											
										} else if (!$('.nowAdError1Pos').hasClass('hide')) {
											
											//console.log('现居住地址(1)未选择。');
											
											return false;
											
										} else if (!$('.nowAdError2Pos').hasClass('hide')) {
											
											//console.log('现居住地址(2)未选择。');
											
											return false;
											
										} else if (!$('.nowAdError3Pos').hasClass('hide')) {
											
											//console.log('现居住地址(3)未选择。');
											
											return false;
											
										} else if (!$('.nowAdError4Pos').hasClass('hide')) {
											
											//console.log('现居住地址(4)未选择。');
											
											return false;
											
										} else {
											
											form.submit();
											
										}
										
									}
									
								});
								
							}
							
						});
						
					};
					
					valior.valior.åünext = function () {
						
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
					
					valior.valior.åüoriginal = function () {
						
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
						
						this.utils.åüstopRightClick();
						
						this.schoolSwitch.åüinit();
						
						this.valior.åüinit();
						
					}.bind(privateFn); /*A function created using Function.bind()*/;
					
					return thisModule;
					
				} ($, getStuInfo || {}));
				
				getStuInfo.init();
				
				
				
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