/**
 * Statement: 
 * 
 * Describe: 
 * 
 * Further changes, comments: 
 * 
 * Docs: 
 * 
 * Original Author: 
 * 
 * Thanks: 
 * 
 * Version: 
 * 
 * Creation Date: 
 * 
 * Last update: 
 * 
 * Music ( Custom ): 
 * 
 * License: 
 * 
 * Copyright: 
 */

;(function (Global, window, document, undefined) {
	
	'use strict';
	
	var pluginName = 'slt',
		
		thisModule,
		
		defaults = {
			
			sldSpeed: 400, // slide speed,
			
			arwSpeed: 400,
			
			effect: 'swing',
			
			offsetY: 15,

			form: '' // slide offset
			
		},
		
		_AMD;
	
	thisModule = function ($, modernizr) {
		
		var transform = modernizr.prefixed('transform'),
			
			arr_status = false,
			
			angle = 180,
			
			tgl = false,
			
			permits = false;
			
		var Plugin = (function () {
			
			var Class = function (element, options) {
				
				this.element = element;
				
				this.options = $.extend({}, defaults, options);
				
				this._defaults = defaults;
				
				this._name = pluginName;
				
				this._panel = $(this.element).find('.slt_panel');
				
				this._originalSelector = $(this.element).children('select');
				
				this._selectedItem = this._panel.siblings('.slt_selected');
				
				this.init();
				
				if (!(this instanceof Class)) {
					
					console.log('New Instance!');
					
					return new Class(element, options);
					
				}
				
			};
			
			return Class;
			
		}());
		
		Plugin.prototype.init = function () {
			
			this.build();
			
			this._blur();
			
			this._change();
			
			this._click();
			
		};
		
		Plugin.prototype.utils = (function () {
			
			var instance = null,
				
				them = {
					
					getAgent: function () {
						
						return navigator.userAgent.toLowerCase();
						
					},
					
					isIE: function(userAgent) {
						
						var agent = userAgent || this.getAgent();
						
						return !!agent.match(/msie/i);
						
					},
					
					isGteIE9: function(userAgent) {
						
						var agent = userAgent || this.getAgent(),
							
							match = agent.match(/msie\D*([\.\d]*)/i),
							
							version = 0;
						
						if (match && match[1]) {
							
							version = match[1];
							
						}
						
						return version >= 9;
						
					},
					
					dpControl: function (e) { //dp: preventDefault & stopPropagation.
						
						e.preventDefault();
						
						e.stopPropagation();
						
					},
					
					triggerEvent: function () {} //Touch device or common device.
					
				};
			
			return {
				
				getInstance: function () {
					
					if (!instance) {
						
						instance = them;
						
					}
					
					return instance;
					
				}
				
			};
			
		} ());
		
		Plugin.prototype.build = function () {};
		
		Plugin.prototype.animations = {
			
			panel_animation: function (obj, opacity, offsetY, duration, easing, done) {
				
				obj.show().animate({opacity: opacity, top: offsetY}, {
					
					duration: duration,
					
					easing: easing,
					
					queue: false,
					
					done: done
					
				});
				
			},
			
			arrow_animation: function (obj, angle, opts) {
				
				var _util = Plugin.prototype.utils.getInstance();
				
				var ancient_browser = function () {
					
					if (!arr_status) { // definein line: 53
						
						obj.addClass('selectorEdOpen');
						
						arr_status = true;
						
					} else {
						
						obj.removeClass('selectorEdOpen');
						
						arr_status = false;
						
					}
					
				};
				
				var modern_browser = function () {
					
					obj.animate({rotation: angle}, {
						
						duration: opts.arwSpeed,
						
						easing: opts.effect,
						
						queue: false,
						
						step: function(now, fx) {
							
							$(this).css(transform, 'rotate(' + now + 'deg)');
							
						}
						
					});
					
				}
				
				_util.isIE() ? (_util.isGteIE9() ? modern_browser() : ancient_browser()) : modern_browser();
				
			},
			
			show_panel: function (triggerObj, panelObj, opts) {
				
				panelObj.removeClass('hide');
				
				/* Test script: console.log('当前旋转角度：' + angle + '.'); */
				
				this.panel_animation(panelObj, 1, 0, opts.sldSpeed, opts.effect, function () {
					
					angle = angle + 180;
					
					tgl = true;
					
					/* Test script: console.log('下次旋转至：' + angle + '.'); */
					
				});
				
				this.arrow_animation(triggerObj.next().children(), angle, opts);
				
			},
			
			hide_panel: function (triggerObj, panelObj, opts) {
				
				/* Test script: console.log('当前旋转角度：' + angle + '.'); */
				
				this.panel_animation(panelObj, 0, opts.offsetY, opts.sldSpeed, opts.effect, function () {
					
					angle = angle + 180;
					
					panelObj.addClass('hide');
					
					tgl = false;

					permits = false;
					
					/* Test script: console.log('下次旋转至：' + angle + '.'); */
					
				});
				
				this.arrow_animation(triggerObj.next().children(), angle, opts);
				
			}
			
		};
		
		Plugin.prototype._click = function () {
			
			var _this = this, that, sltContainer, crtOrgSelector, crtSelectedItem;
			
			var _fn = function (e) {
				
				if (e.data.name == 'selectedItem') {
					
					crtOrgSelector = $(this).closest('.slt_container').find('select');
					
					if (!tgl) {
						
						permits = true;
						
						crtOrgSelector.focus();
						
					}
					
				}
				
				if (e.data.name == 'selectOption') {
					
					that = $(this);
					
					sltContainer = that.closest('.slt_container');
					
					crtOrgSelector = sltContainer.find('select');
					
					crtSelectedItem = sltContainer.find('.slt_selected');
					
					crtOrgSelector.children('option').eq(that.index()+1).prop('selected', 'true').change();

					crtOrgSelector.valid();
					
					crtSelectedItem.children().text(that.text());
					
				}
				
			};
			
			_this._selectedItem.on('click.slt.selected', {name: 'selectedItem'}, _fn);
			
			_this._panel.on('click.slt.option', 'li', {name: 'selectOption'}, _fn);
			
		};
		
		Plugin.prototype._change = function () {
			
			$(this.element).children('select').on('change', function () {});
			
		};
		
		Plugin.prototype._blur = function () {
			
			var _this = this, that, sltContainer, crtOrgSelector, crtSelectedItem, crtSelectPanel;
			
			_this._originalSelector.on('focusin', function () {
				
				that = $(this);
				
				sltContainer = that.closest('.slt_container');
				
				crtOrgSelector = sltContainer.find('select');
				
				crtSelectedItem = sltContainer.find('.slt_selected');
				
				crtSelectPanel = sltContainer.find('.slt_panel');
				
				if (permits == true) {
					
					_this.animations.show_panel(crtSelectedItem, crtSelectPanel, _this.options);
					
				}
				
			});
			
			_this._originalSelector.on('focusout', function () {
				
				that = $(this);
				
				sltContainer = that.closest('.slt_container');
				
				crtOrgSelector = sltContainer.find('select');
				
				crtSelectedItem = sltContainer.find('.slt_selected');
				
				crtSelectPanel = sltContainer.find('.slt_panel');
				
				if (permits == true) {
					
					_this.animations.hide_panel(crtSelectedItem, crtSelectPanel, _this.options);
					
				}
				
			});
			
		};
		
		$.fn[pluginName] = function (options) {
			
			return this.each(function () {
				
				if (!$.data(this, 'plugin_' + pluginName)) {
					
					$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
					
				}
				
			});
			
		};
		
	};
	
	_AMD = (function (_global, _register, _module) {
		
		var hasDefine = typeof define === "function" && define.amd,
			
			hasExports = typeof module !== "undefined" && module.exports,
			
			dependencies = ['jquery', 'cdnjs/modernizr_amd/modernizr.min'];
		
		var registryProfile = function () {
			
			if (hasDefine) {
				
				define(dependencies, _module);
				
			} else if (hasExports) {
				
				module.exports = _module;
				
			} else {
				
				var _$ = _global.jQuery || _global.$;
				
				_module(_$);
				
			}
			
		};
		
		_register.init = function () {
			
			registryProfile();
			
		};
		
		return _register;
		
	}(Global, _AMD || {}, thisModule)).init();
	
}(this, window, document));