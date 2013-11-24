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
	
	var thisModule = null,
		
		pluginName = 'slt',
		
		defaults = {
			
			sldSpeed: 100, // slide speed,
			
			arwSpeed: 100,
			
			effect: 'swing',
			
			offsetY: 15 // slide offset
			
		};
	
	thisModule = function ($, modernizr) {
		
		var transform = modernizr.prefixed('transform'),
			
			arr_status = false,
			
			angle = 180,
			
			tgl = false;
			
		var Plugin = (function () {
			
			var Class = function (element, options) {
				
				this.element = element;
				
				this.options = $.extend({}, defaults, options);
				
				this._defaults = defaults;
				
				this._name = pluginName;
				
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
			
			this._click();
			
			this._change();
			
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
				
				obj.animate({opacity: opacity, top: offsetY}, {
					
					duration: duration,
					
					easing: easing,
					
					queue: false,
					
					done: done
					
				});
				
			},
			
			arrow_animation: function (obj, angle, opts) {
				
				var _this = Plugin.prototype.utils.getInstance();
				
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
				
				_this.isIE() ? (_this.isGteIE9() ? modern_browser() : ancient_browser()) : modern_browser();
				
			},
			
			show_panel: function (triggerObj, panelObj, opts) {
				
				panelObj.removeClass('hide');
				
				this.panel_animation(panelObj, 1, 0, opts.sldSpeed, opts.effect, function () {
					
					angle = angle + 180;
					
					tgl = true;
					
				});
				
				this.arrow_animation(triggerObj.next().children(), angle, opts);
				
			},
			
			hide_panel: function (triggerObj, panelObj, opts) {
				
				this.panel_animation(panelObj, 0, opts.offsetY, opts.sldSpeed, opts.effect, function () {
					
					angle = angle + 180;
					
					panelObj.addClass('hide');
					
					tgl = false;
					
				});
				
				this.arrow_animation(triggerObj.next().children(), angle, opts);
				
			}
			
		};
		
		Plugin.prototype._click = function () {
			
			var it = $(this.element),
				
				panel = it.find('.slt_panel'),
				
				originalSelector = it.children('select'),
				
				_this = this,
				
				opts = this.options,
				
				utils = Plugin.prototype.utils.getInstance();
			
			var _triggerHandler = function (e) {
				
				utils.dpControl(e);
				
				var that = $(this);

				originalSelector.focus();
				
				!tgl ? _this.animations.show_panel(that, panel, opts) : _this.animations.hide_panel(that, panel, opts);
				
			};
			
			var optionHandler = function (e) {
				
				utils.dpControl(e);
				
				var that = $(this),
					
					selected = panel.siblings('.slt_selected');
				
				originalSelector.children('option').eq(that.index()).prop('selected', 'true').change();
				
				selected.children().text(that.text());
				
				_this.animations.hide_panel(selected, panel, opts);
				
			};
			
			it.on('click.slt.selected', '.slt_selected', _triggerHandler);
			
			panel.on('click.slt.option', 'li', optionHandler);
			
		};
		
		Plugin.prototype._change = function () {
			
			$(this.element).children('select').on('change', function () {});
			
		};
		
		$.fn[pluginName] = function (options) {
			
			return this.each(function () {
				
				if (!$.data(this, 'plugin_' + pluginName)) {
					
					$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
					
				}
				
			});
			
		};
		
	};
	
	var _AMD = (function (_global, _register, _module) {
		
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
		
	}(Global, _AMD || {}, thisModule));
	
	_AMD.init();
	
}(this, window, document));