/**
 * Statement: Just shut the fuck up!In case you hadn’t noticed, I’m a bit of a stickler for terminology.You motherfucker!!!
 * 
 * Describe: The javascript boot file of first registration progress page ( ~/registration/index@2.html ).
 * 
 * Further changes, comments: ~
 * 
 * Docs: ~
 * 
 * Original Author: Tony ( Shen Weizhong ).
 * 
 * Version: 0.1.0
 * 
 * Creation Date: 2013.10.28 14:41 ( Tony ).
 * 
 * Last update: 2013.10.29 13:07 ( Tony ).
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
			
			'cdnjs/gridder/0.1.0/gridder.min',
			
			'cdnjs/mousetrap/1.4.5/mousetrap.min',
			
			'cdnjs/jquery_title_modify/title.modify.min'
		
		], function (modernizr, SJ, cookie, gridder, keyboard, modifyTitle) {
			
			SJ(function ($) {

				/*
				++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
				++++++++++++++++++++++++++++++++,,++++++++++++++++++MM++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++,,++++,,++++++,...++,,++++++++++++++++++,,++
				`7MM"""Yp,++++++++++++++++++++++db++++++++++++++++++MM+++++MMP""MM""YMM++++++++++++++++++++++++++++++++++++++`7MMM.+++++,MMF'+++++++++++++++`7MM++++db++++.d'+""++db++++++++++++++++`7MM++
				++MM++++Yb++++++++++++++++++++++++++++++++++++++++++MM+++++P'+++MM+++`7++++++++++++++++++++++++++++++++++++++++MMMb++++dPMM+++++++++++++++++++MM++++++++++dM`+++++++++++++++++++++++++MM++
				++MM++++dP++.gP"Ya+++.P"Ybmmm+`7MM++`7MMpMMMb.++++++MM++++++++++MM+++++++,pW"Wq.++`7MMpMMMb.++`7M'+++`MF'++++++M+YM+++,M+MM+++,pW"Wq.++++,M""bMM++`7MM+++mMMmm++`7MM+++.gP"Ya++++,M""bMM++
				++MM"""bg.+,M'+++Yb+:MI++I8+++++MM++++MM++++MM++++++MM++++++++++MM++++++6W'+++`Wb+++MM++++MM++++VA+++,V++++++++M++Mb++M'+MM++6W'+++`Wb+,AP++++MM++++MM++++MM++++++MM++,M'+++Yb+,AP++++MM++
				++MM++++`Y+8M""""""++WmmmP"+++++MM++++MM++++MM++++++MM++++++++++MM++++++8M+++++M8+++MM++++MM+++++VA+,V+++++++++M++YM.P'++MM++8M+++++M8+8MI++++MM++++MM++++MM++++++MM++8M""""""+8MI++++MM++
				++MM++++,9+YM.++++,+8M++++++++++MM++++MM++++MM++++++MM++++++++++MM++++++YA.+++,A9+++MM++++MM++++++VVV++++++++++M++`YM'+++MM++YA.+++,A9+`Mb++++MM++++MM++++MM++++++MM++YM.++++,+`Mb++++MM++
				.JMMmmmd9+++`Mbmmd'++YMMMMMb++.JMML..JMML++JMML.++++MM++++++++.JMML.+++++`Ybmd9'++.JMML++JMML.++++,V+++++++++.JML.+`'++.JMML.+`Ybmd9'+++`Wbmd"MML..JMML..JMML.++.JMML.+`Mbmmd'++`Wbmd"MML.
				++++++++++++++++++++6'+++++dP+++++++++++++++++++++++MM+++++++++++++++++++++++++++++++++++++++++++,V+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
				++++++++++++++++++++Ybmmmd'+++++++++++++++++++++++++MM++++++++++++++++++++++++++++++++++++++++OOb"++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
																																								Begin | Tony Modified. | Font = Georgia 11
				*/
				
				var registrationProtocol = (function (thisModule) {
					
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
					*/
					
					internalProtection['protocolChecked'] = $('#protocolChecked');
						
					internalProtection['protocolError'] = $('.protocolError');
						
					internalProtection['btnNext'] = $('.protocolTool').children('a');

					internalProtection['status'] = false;
					
					/*
							 (__)   
							 (oo)   
					  /-------\/    
					 / |     ||----> Private function: This can be used when coming back from other pages.
					*  ||----||     
					  ___/  ___/    
					*/
					
					internalProtection.defaultJudgement = function () {
						
						if (this.protocolChecked.prop('checked') === true) {
							
							this.btnNext.removeClass('disable');
							
						}
						
					};
					
					/*
							 (__)   
							 (oo)   
					  /-------\/    
					 / |     ||----> Private function: Handle the actions when click the next step button.
					*  ||----||     
					  ___/  ___/    
					*/
					
					internalProtection.clickNext = function () {
						
						var checkBox = this.protocolChecked,
							
							errorTip = this.protocolError;
						
						this.btnNext.on('click', function (e) {
							
							if (!checkBox.prop('checked') === true) {
								
								e.stopPropagation();
								
								e.preventDefault();
								
								if (checkBox.data('error') !== 'yeah') {
									
									errorTip.removeClass('hide');
									
									checkBox.data('error', 'yeah');
									
									//Test script: console.log('Just show one time!');
									
								}
								
								//Test script: console.log('Count Up!');
								
							}
							
						});
						
					};
					
					/*
							 (__)   
							 (oo)   
					  /-------\/    
					 / |     ||----> Private function: Handle the actions when the 'checked' property of checkbox changed.
					*  ||----||     
					  ___/  ___/    
					*/
					
					internalProtection.checkBoxChange = function () {
						
						var checkBox = this.protocolChecked,
							
							errorTip = this.protocolError,
							
							btnNext = this.btnNext;
						
						checkBox.on('change', function () {
						
							var that = $(this);
							
							if (that.prop('checked') === true) {
								
								btnNext.removeClass('disable');
								
								if (that.data('error') === 'yeah') {
									
									errorTip.addClass('hide');

									that.data('error', 'noop');
									
								}
								
							} else {
								
								errorTip.removeClass('hide');
								
								btnNext.addClass('disable');
								
								that.data('error', 'yeah');
								
							}
							
						});

						checkBox.on('keyup', function () {

							keyboard.trigger('enter');

						});
						
					};
					
					/*
							 (__)   
							 (oo)   
					  /-------\/    
					 / |     ||----> Private function: Handle the keyboard shortcut to go to next page.( ctrl + shift + n )
					*  ||----||     
					  ___/  ___/    
					*/
					
					internalProtection.keyboardShortcuts = function () {

						var btnNext = this.btnNext,

							checkBox = this.protocolChecked,
							
							errorTip = this.protocolError;

						keyboard.bind('enter', function() {
							
							if ($('#protocolChecked').prop('checked') !== true) {
								
								errorTip.removeClass('hide');
									
								$('#protocolChecked').data('error', 'yeah');

								//Test script: console.log('Unchecked!');
								
							} else {

								document.location = $.trim(btnNext.attr('href'));

								//Test script: console.log('Checked!');

							}

						});

					};
					
					/*
							 (__)   
							 (oo)   
					  /-------\/    
					 / |     ||----> Public function: Handle the actions when the 'checked' property of checkbox changed.
					*  ||----||     
					  ___/  ___/    
					*/
					
					thisModule.init = function (opts) {
							
						var excute = function () {
							
							internalProtection.defaultJudgement();
							
							internalProtection.clickNext();
							
							internalProtection.checkBoxChange();

							internalProtection.keyboardShortcuts();
							
							//Test script: console.log('Excuted!');
							
						};
							
						opts.excute ? excute() : console.log('Sorry! Do not have the permission to excute part of program.');
						
					};
					
					return thisModule;
					
				} (registrationProtocol || {}));
				
				registrationProtocol.init({excute: true});
				
				/*
				+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
				+++++++++++++++++++++++++++++++,,++++++MM++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++,,++++,,++++++,...++,,++++++++++++++++++,,++
				`7MM"""YMM+++++++++++++++++++`7MM++++++MM+++++MMP""MM""YMM++++++++++++++++++++++++++++++++++++++`7MMM.+++++,MMF'+++++++++++++++`7MM++++db++++.d'+""++db++++++++++++++++`7MM++
				++MM++++`7+++++++++++++++++++++MM++++++MM+++++P'+++MM+++`7++++++++++++++++++++++++++++++++++++++++MMMb++++dPMM+++++++++++++++++++MM++++++++++dM`+++++++++++++++++++++++++MM++
				++MM+++d++++`7MMpMMMb.++++,M""bMM++++++MM++++++++++MM+++++++,pW"Wq.++`7MMpMMMb.++`7M'+++`MF'++++++M+YM+++,M+MM+++,pW"Wq.++++,M""bMM++`7MM+++mMMmm++`7MM+++.gP"Ya++++,M""bMM++
				++MMmmMM++++++MM++++MM++,AP++++MM++++++MM++++++++++MM++++++6W'+++`Wb+++MM++++MM++++VA+++,V++++++++M++Mb++M'+MM++6W'+++`Wb+,AP++++MM++++MM++++MM++++++MM++,M'+++Yb+,AP++++MM++
				++MM+++Y++,+++MM++++MM++8MI++++MM++++++MM++++++++++MM++++++8M+++++M8+++MM++++MM+++++VA+,V+++++++++M++YM.P'++MM++8M+++++M8+8MI++++MM++++MM++++MM++++++MM++8M""""""+8MI++++MM++
				++MM+++++,M+++MM++++MM++`Mb++++MM++++++MM++++++++++MM++++++YA.+++,A9+++MM++++MM++++++VVV++++++++++M++`YM'+++MM++YA.+++,A9+`Mb++++MM++++MM++++MM++++++MM++YM.++++,+`Mb++++MM++
				.JMMmmmmMMM+.JMML++JMML.+`Wbmd"MML.++++MM++++++++.JMML.+++++`Ybmd9'++.JMML++JMML.++++,V+++++++++.JML.+`'++.JMML.+`Ybmd9'+++`Wbmd"MML..JMML..JMML.++.JMML.+`Mbmmd'++`Wbmd"MML.
				+++++++++++++++++++++++++++++++++++++++MM+++++++++++++++++++++++++++++++++++++++++++,V+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
				+++++++++++++++++++++++++++++++++++++++MM++++++++++++++++++++++++++++++++++++++++OOb"++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
																																				   Begin | Tony Modified. | Font = Georgia 11
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