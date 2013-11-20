/**
 * Statement: Just shut the fuck up!In case you hadn’t noticed, I’m a bit of a stickler for terminology.You motherfucker!!!
 * 
 * Describe: The javascript boot file of second registration progress page ( ~/registration/index@3.html ).
 * 
 * Further changes, comments: ~
 * 
 * Docs: ~
 * 
 * Original Author: Tony ( Shen Weizhong ).
 * 
 * Version: 0.1.0
 * 
 * Creation Date: 2013.10.29 15:40 ( Tony ).
 * 
 * Last update: 2013.10.29 15:40 ( Tony ).
 * 
 * Music: Hotel Transylvania - The Monster Remix - will.i.am.mp3
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
			
			'cdnjs/mousetrap/1.4.5/mousetrap.min',
			
			'cdnjs/jquery_cookie/1.3.1/jquery.cookie.min',

			'cdnjs/jquery_xdomainrequest/1.0.1/jquery.xdomainrequest.min',
			
			'cdnjs/jquery_validation/1.11.1/jquery.validate.min',
			
			'cdnjs/gridder/0.1.0/gridder.min',
			
			'cdnjs/jquery_title_modify/title.modify.min'
		
		], function (modernizr, SJ, keyboard, cookie, XR, Hawaii, gridder, modifyTitle) {
			
			SJ(function ($) {

				/*
				+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
				88888888ba++++++++++++++++++++++++++++88+++++++++++++++++++88++++++888888888888+++++++++++++++++++++++++++++++++++++++++++++88b+++++++++++d88++++++++++++++++++++++++88++88+++++ad88++88+++++++++++++++++++++++88++
				88++++++"8b+++++++++++++++++++++++++++""+++++++++++++++++++88+++++++++++88++++++++++++++++++++++++++++++++++++++++++++++++++888b+++++++++d888++++++++++++++++++++++++88++""++++d8"++++""+++++++++++++++++++++++88++
				88++++++,8P++++++++++++++++++++++++++++++++++++++++++++++++88+++++++++++88++++++++++++++++++++++++++++++++++++++++++++++++++88`8b+++++++d8'88++++++++++++++++++++++++88++++++++88++++++++++++++++++++++++++++++88++
				88aaaaaa8P'+++,adPPYba,+++,adPPYb,d8++88++8b,dPPYba,+++++++88+++++++++++88++++++++,adPPYba,+++8b,dPPYba,+++8b+++++++d8++++++88+`8b+++++d8'+88+++,adPPYba,++++,adPPYb,88++88++MM88MMM++88+++,adPPYba,+++,adPPYb,88++
				88""""""8b,++a8P_____88++a8"++++`Y88++88++88P'+++`"8a+++++++++++++++++++88+++++++a8"+++++"8a++88P'+++`"8a++`8b+++++d8'++++++88++`8b+++d8'++88++a8"+++++"8a++a8"++++`Y88++88++++88+++++88++a8P_____88++a8"++++`Y88++
				88++++++`8b++8PP"""""""++8b+++++++88++88++88+++++++88++++++88+++++++++++88+++++++8b+++++++d8++88+++++++88+++`8b+++d8'+++++++88+++`8b+d8'+++88++8b+++++++d8++8b+++++++88++88++++88+++++88++8PP"""""""++8b+++++++88++
				88++++++a8P++"8b,+++,aa++"8a,+++,d88++88++88+++++++88++++++88+++++++++++88+++++++"8a,+++,a8"++88+++++++88++++`8b,d8'++++++++88++++`888'++++88++"8a,+++,a8"++"8a,+++,d88++88++++88+++++88++"8b,+++,aa++"8a,+++,d88++
				88888888P"++++`"Ybbd8"'+++`"YbbdP"Y8++88++88+++++++88++++++88+++++++++++88++++++++`"YbbdP"'+++88+++++++88++++++Y88'+++++++++88+++++`8'+++++88+++`"YbbdP"'++++`"8bbdP"Y8++88++++88+++++88+++`"Ybbd8"'+++`"8bbdP"Y8++
				++++++++++++++++++++++++++aa,++++,88+++++++++++++++++++++++88++++++++++++++++++++++++++++++++++++++++++++++++++d8'+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
				+++++++++++++++++++++++++++"Y8bbdP"+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++d8'++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
																																																					 Font: Univers.
				*/

				var phoneValidation = (function ($, thisModule) {
					
					/*
							 (__)   
							 (oo)   
					  /-------\/    
					 / |     ||----> Private functions.
					*  ||----||     
					  ___/  ___/
					*/
					
					var internalProtection = {};
					
					/*
							 (__)   
							 (oo)   
					  /-------\/    
					 / |     ||----> Private variables.
					*  ||----||     
					  ___/  ___/

					 1. 验证手机号码在数据库的唯一性，并将状态返回存储在该变量中。

					 2. 手机号码唯一性、有效性验证都通过后，将转改存储在该变量中。
					*/

					internalProtection['phoneValiStatus'] = false; /* 1 */

					internalProtection['nextpermission'] = false; /* 2 */
					


					/*
							 (__)   
							 (oo)   
					  /-------\/    
					 / |     ||----> 关闭操作提示.
					*  ||----||     
					  ___/  ___/
					*/

					internalProtection.enterTip = function () {

						$('.enterTip').on('click', function (e) {

							var that = $(this),

								clickCloseArea = function (e) {

									e.stopPropagation();
									
									e.preventDefault();
									
									that.addClass('hide');

									$('#userPhone').focus();

								},

								clickOtherArea = function () {

									that.addClass('hide');

									$('#userPhone').focus();

								};

							e.target.nodeName == 'A' ? clickCloseArea(e) : clickOtherArea();

						});

					};
					
					/*
							 (__)   
							 (oo)   
					  /-------\/    
					 / |     ||----> Private functions: 
					*  ||----||     
					  ___/  ___/
					*/
					
					internalProtection.frmPhoneValidation = function () {

						var privateObj = this;

						/**
						 * 130, 133, 147, 150,153,156，157, 158,159，180, 183, 188，189
						 */

						$.validator.addMethod("phoneNumber", function(value, element) {
							
							return this.optional(element) || /^(1(([35][0-9])|(47)|[8][01236789]))\d{8}$/.test(value);
							
						}, "请输入正确的手机号码。");

						var queryUrl = 'http://192.168.0.107:8080/fenqimall/registerResp';

						var queryString = {

							operation: function () {

								return 'unique_mobile';

							},

							phoneNumber: function () {

								return $.trim($('#userPhone').val());

							},

							userName: function () {

								return $.trim($('.userName').text());

							}

						};

						/**
						 * URL, Query String, [ http | https ] [ host ] [ port ] [ base url ] ( [ operation = unique_mobile | validate_mobile_suc ] [ phoneNumber = ? ] [ userName = ? ] )
						 */

						$( "#frmPhoneSubmit" ).validate({

							debug: true,

							rules: {

								userPhone: {
									
									required: true,

									phoneNumber: true,

									remote: {

										url: queryUrl,

										data: queryString,

										complete: function (jqXHR, textStatus) {

											var valid = function () {

												privateObj.phoneValiStatus = true;

												privateObj.remoteValiSuccess();

											};

											var unValid = function () {

												privateObj.phoneValiStatus = false;

												privateObj.remoteValiFaith();

											};

											jqXHR.responseText !== '{"result":"false"}' ? valid() : unValid();

											/* Test script: console.log(jqXHR.responseText); */

											/* Test script: console.log(textStatus);*/

										}

									}

								}

							},

							messages: {

								userPhone: {

									remote: '该号码已存在。'

								}

							},
							
							onfocusout: function(element) { 
								
								SJ(element).valid();
								
							},
							
							onkeyup: function(element) {
								
								SJ(element).valid();
								
							},
							
							errorElement: 'div',
							
							errorPlacement: function (error, element) {
								
								SJ(error).addClass('absol phoneValiError box_round');
								
								SJ(element).parent().append(error);
								
							},
							
							success: function(error) {
								
								SJ(error).remove();
								
							},
							
							submitHandler: function (form, event) {}

						});

						//Test script: console.log('Testing.');

					};
					
					/*
							 (__)   
							 (oo)   
					  /-------\/    
					 / |     ||----> 远程验证 ”成功“ 后触发的行为。
					*  ||----||     
					  ___/  ___/
					*/
					
					internalProtection.remoteValiSuccess = function () {

						/* Test script: console.log('Remote validation is successful.'); */

					};
					
					/*
							 (__)   
							 (oo)   
					  /-------\/    
					 / |     ||----> 远程验证 “失败” 后触发的行为。
					*  ||----||     
					  ___/  ___/
					*/
					
					internalProtection.remoteValiFaith = function () {

						$('.validatingPanel').addClass('hide');

						this.resetCountDown();

						/* Test script:  */console.log('Remote validation is faithful.');

					};
					
					/*
							 (__)   
							 (oo)   
					  /-------\/    
					 / |     ||----> 点击 “发送验证码” 按钮触发的行为。
					*  ||----||     
					  ___/  ___/
					*/
					
					internalProtection.clickBtnSendCode = function () {

						var _this = this;

						$('#btnSendCode').on('click', function (e) {

							var trueStatus = function () {

									$('.validatingPanel').removeClass('hide');

									$('#valiCode').focus();

									_this.resentCountDown();

									console.log('Fuck Off!Cell phone validation!!!!!Yeah!It\'s you!I have passed!Bite me!');

								},

								falseStatus = function (e) {

									e.stopPropagation();

									e.preventDefault();

									SJ('#userPhone').valid();

								};

							_this.phoneValiStatus == true ? trueStatus() : falseStatus(e);

							//Test script: console.log('Fuck Off!');

						});

					};
					
					/*
							 (__)   
							 (oo)   
					  /-------\/    
					 / |     ||----> 重新发送验证码计时器。
					*  ||----||     
					  ___/  ___/
					*/
					
					var sec = 60,

						timer;

					internalProtection.resentCountDown = function () {

						var linkResent = $('.linkResent'),

							countDownResent = linkResent.children('span'),

							intervalFn = function () {

								countDownResent.text(--sec);

								if (sec == 0) {

									window.clearInterval(timer);

									var strResent = $('<span>重新发送</span>');

									linkResent.html(strResent);

								};

							};

						timer = window.setInterval(intervalFn, 1000);

						/* Test script: */console.log(countDownResent.text());

					};
					
					/*
							 (__)   
							 (oo)   
					  /-------\/    
					 / |     ||----> “重置” 发送验证码的计时器。
					*  ||----||     
					  ___/  ___/
					*/
					
					internalProtection.resetCountDown = function () {

						window.clearInterval(timer);

						sec = 60;

						$('.linkResent').children('span').text(60);

					};
					
					/*
							 (__)   
							 (oo)   
					  /-------\/    
					 / |     ||----> 对发送至手机的验证码进行验证。
					*  ||----||     
					  ___/  ___/
					*/
					
					internalProtection.codeValidation = function () {

						var _this = this;

						$( "#frmCodeEnterArea" ).validate({

							debug: true,

							rules: {

								valiCode: {
									
									required: true,

									number: true

								}

							},
							
							onfocusout: function(element) { 
								
								SJ(element).valid();
								
							},
							
							onkeyup: function(element) {
								
								SJ(element).valid();
								
							},
							
							errorElement: 'div',
							
							errorPlacement: function (error, element) {
								
								SJ(error).addClass('absol valiCodeError box_round');
								
								SJ(element).parent().append(error);
								
							},
							
							success: function(error) {
								
								SJ(error).remove();
								
							},
							
							submitHandler: function (form, event) {

								/**
								 * URL, Query String, [ http | https ] [ host ] [ port ] [ base url ] ( [ operation = unique_mobile | validate_mobile_suc ] [ phoneNumber = ? ] [ userName = ? ] [ CAPTCHA = ? ] [ password = ? ] )
								 */

								$.ajax({

									url: 'http://192.168.0.107:8080/fenqimall/registerResp',

									mode: 'abort',

									dataType: 'json',

									/*data: 'operation=validate_mobile_suc&phoneNumber='+$('#userPhone').val()+'&userName='+$('.userName').val()+'&CAPTCHA='+$('#valiCode').val()+'&password='+$('.userPass').val(),*/

									data: {

										operation: function () {

											return 'validate_mobile_suc';

										},

										phoneNumber: function () {

											return $.trim($('#userPhone').val());

										},

										userName: function () {

											return $.trim($('.userName').text());

										},

										CAPTCHA: function () {

											return $.trim($('#valiCode').val());

										},

										password: function () {

											return $.trim($('.userPass').text());

										}

									},

									success: function (response) {

										/*
										
										Test Script: 

											console.log('User phone: ' + $('#userPhone').val());

											console.log('User Name: ' + $('.userName').text());

											console.log('User Validation Code: ' + $('#valiCode').val());

											console.log('User Password: ' + $('.userPass').text());

											console.log(response);

											console.log(response.result);

										*/

										response.result === 'true' ? _this.valiCodeRemoteSuccess() : _this.valiCodeRemoteFaith();

									}

								});
								
							}

						});

						//Test script: console.log('Testing.');

					};

					internalProtection.valiCodeRemoteSuccess = function () {

						this.nextpermission = true;

						$('.pnvTool').children('a.next').removeClass('disable');

						// Hide Error Tip.

						if (!$('.ajaxFormSubmitError').hasClass('hide')) {

							$('.ajaxFormSubmitError').addClass('hide');

						}

						// Switch progress status.

						$('.frmPhoneSubmit, .validatingPanel').addClass('hide');

						$('.valiSuccessBar, .valiSuccessTip').removeClass('hide');

						// Change phone validated status.

						var strPhoneValidated = $('.pgsItem.second').children('span.s');

						if ($.cookie('phonevalidated') == undefined || $.cookie('phonevalidated') == '' || $.cookie('phonevalidated') == null) {

							$.cookie('phonevalidated', 'true');

							strPhoneValidated.addClass('passedColor');

						} else {

							strPhoneValidated.addClass('passedColor');

						}

						/* Test script: console.log('Phone is validated: ' + $.cookie('phonevalidated')); */

						/* Test script: console.log('Oh Yeah! I passed.'); */

					};

					internalProtection.valiCodeRemoteFaith = function () {

						$('.ajaxFormSubmitError').removeClass('hide');

						/* Test script: console.log('Oh! Come on! I haven\'t passed.'); */

					};

					internalProtection.clickBtnNext = function (e) {

						var _this = this;

						$('.pnvTool').children('a.next').on('click', function (e) {

							if (!_this.nextpermission) {

								e.stopPropagation();

								e.preventDefault();

							} else {

							}

						});

					};
					
					/*
							 (__)   
							 (oo)   
					  /-------\/    
					 / |     ||----> Private functions: 键盘事件.
					*  ||----||     
					  ___/  ___/

					 注：完善后再启用该模块。

					*/
					
					/*internalProtection.keyboardShortcuts = function () {

						keyboard.bind('enter', function () {

							$('.enterTip').addClass('hide');

						});

					};*/
					
					/*
							 (__)   
							 (oo)   
					  /-------\/    
					 / |     ||----> Public functions: Start all subroutines.
					*  ||----||     
					  ___/  ___/

					 1. 执行快捷键模块；

					 2. 执行提示信息模块；

					 3. 执行手机号码唯一性验证模块；

					 4. 执行手机号码有效性验证模块；

					 5. 执行点击“发送验证码”按钮模块；

					 6. 执行点击“下一步”按钮模块；
					*/
					
					thisModule.init = function (opts) {

						var excute = function () {

							/*internalProtection.keyboardShortcuts();*/ /* 1 */

							internalProtection.enterTip(); /* 2 */

							internalProtection.frmPhoneValidation(); /* 3 */

							internalProtection.codeValidation(); /* 4 */

							internalProtection.clickBtnSendCode(); /* 5 */

							internalProtection.clickBtnNext(); /* 6 */

						};

						opts.excute ? excute() : console.log('Sorry! Do not have the permission to excute part of program.');

					};

					return thisModule;

				} ($, phoneValidation || {}));

				phoneValidation.init({excute: true});

				/*
				+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
				88888888888++++++++++++++++++++++++88++++++88++++++888888888888+++++++++++++++++++++++++++++++++++++++++++++88b+++++++++++d88++++++++++++++++++++++++88++88+++++ad88++88+++++++++++++++++++++++88++
				88+++++++++++++++++++++++++++++++++88++++++88+++++++++++88++++++++++++++++++++++++++++++++++++++++++++++++++888b+++++++++d888++++++++++++++++++++++++88++""++++d8"++++""+++++++++++++++++++++++88++
				88+++++++++++++++++++++++++++++++++88++++++88+++++++++++88++++++++++++++++++++++++++++++++++++++++++++++++++88`8b+++++++d8'88++++++++++++++++++++++++88++++++++88++++++++++++++++++++++++++++++88++
				88aaaaa++++++8b,dPPYba,++++,adPPYb,88++++++88+++++++++++88++++++++,adPPYba,+++8b,dPPYba,+++8b+++++++d8++++++88+`8b+++++d8'+88+++,adPPYba,++++,adPPYb,88++88++MM88MMM++88+++,adPPYba,+++,adPPYb,88++
				88"""""++++++88P'+++`"8a++a8"++++`Y88+++++++++++++++++++88+++++++a8"+++++"8a++88P'+++`"8a++`8b+++++d8'++++++88++`8b+++d8'++88++a8"+++++"8a++a8"++++`Y88++88++++88+++++88++a8P_____88++a8"++++`Y88++
				88+++++++++++88+++++++88++8b+++++++88++++++88+++++++++++88+++++++8b+++++++d8++88+++++++88+++`8b+++d8'+++++++88+++`8b+d8'+++88++8b+++++++d8++8b+++++++88++88++++88+++++88++8PP"""""""++8b+++++++88++
				88+++++++++++88+++++++88++"8a,+++,d88++++++88+++++++++++88+++++++"8a,+++,a8"++88+++++++88++++`8b,d8'++++++++88++++`888'++++88++"8a,+++,a8"++"8a,+++,d88++88++++88+++++88++"8b,+++,aa++"8a,+++,d88++
				88888888888++88+++++++88+++`"8bbdP"Y8++++++88+++++++++++88++++++++`"YbbdP"'+++88+++++++88++++++Y88'+++++++++88+++++`8'+++++88+++`"YbbdP"'++++`"8bbdP"Y8++88++++88+++++88+++`"Ybbd8"'+++`"8bbdP"Y8++
				+++++++++++++++++++++++++++++++++++++++++++88++++++++++++++++++++++++++++++++++++++++++++++++++d8'+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
				++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++d8'++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
																																																	 Font: Univers.
				*/
				
				
				
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