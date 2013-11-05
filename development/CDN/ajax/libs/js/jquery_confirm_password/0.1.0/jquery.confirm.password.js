(function (name, factory) {
	
	// See http://bugs.jquery.com/ticket/13335
	'use strict';
	
	var theModule = factory,
		
		// this is considered "safe":
		hasDefine = typeof define === "function" && define.amd,
		
		// hasDefine = typeof define === "function",
		hasExports = typeof module !== "undefined" && module.exports;
	
	if ( hasDefine ){ // AMD Module
		
		define(['jquery'], theModule);
		
	} else if ( hasExports ) { // Node.js Module (commonjs compatible)
		
		module.exports = theModule;
		
	} else { // Assign to common namespaces or simply the global object (window)
		
		(this.jQuery || this.ender || this.$ || this)[name] = theModule();
		
	}

} ('Dnewpwd', function (SJ) {

	// See http://bugs.jquery.com/ticket/13335
	'use strict'

	var $ = SJ,

		pluginName = 'retrievepwd',

		thisPlugin = {},

		defaults = {},

        bol = false;

    
   
	thisPlugin.Class = function (obj, options) {

		this.items = obj;

		this.opts = $.extend({}, defaults, options);

 		this.init();

	};

	thisPlugin.Class.prototype.init = function () {
        
		var that = $(this.items);

		this.focusEvent(that);

		this.submitEvent(that);
        
	};

	thisPlugin.Class.prototype.methods = {
        
		isNull: function (obj) {
            
			return obj.val() == '' ? true : false;
            
		},

		isPhoneNum: function (obj) {

			var val = obj.val();

			return /^(1(([35][0-9])|(47)|[8][01236789]))\d{8}$/g.test(val);

		}
        
	};

	thisPlugin.Class.prototype.focusEvent = function (obj) {

		var _this = this;

		obj.find('input').each(function () {

			$(this).on('focusout', function () {

				var val = $(this).val(),

					label = $(this).parent().prev('label').text().slice(0,-1),

					tipBox = $(this).parent().next(),

					isNull = _this.methods.isNull($(this));

				if (isNull) {

					tipBox.find('i').show();

					tipBox.find('span').show().text('请输入' + label);

					bol = false;

				} else {

					tipBox.find('i').hide();

					tipBox.find('span').hide();

					var pwd = $('.newPassword').val(),

						confirmPwd = $('.confirmPwd').val();

					if (pwd === confirmPwd) {
					
						bol = true;

					}

				}

			});

		});

	};

	thisPlugin.Class.prototype.submitEvent = function (obj) {

		var _this = this

		$('.confirmBtn').on('click', function (e) {

			e.preventDefault();

			if (bol) {

				obj.submit();

			} else {

				var input = obj.find('input');

				input.each(function () {

					var val = $(this).val(),

					label = $(this).parent().prev('label').text().slice(0,-1),

					tipBox = $(this).parent().next(),

					isNull = _this.methods.isNull($(this));

					if (isNull) {

						tipBox.find('i').show();

						tipBox.find('span').show().text('请输入' + label);

						bol = false;

					} else {

						tipBox.find('i').hide();

						tipBox.find('span').hide();

						var pwd = $('.newPassword').val(),

							confirmPwd = $('.confirmPwd').val(),

							confirmPwdBox = $('.confirmPwd').parent().next();

						if (pwd !== confirmPwd) {

							confirmPwdBox.find('i').show();

							confirmPwdBox.find('span').show().text('两次输入密码不一致');

							bol = false;

						} else {

							bol = true;

						}

					}

				});

			}

		});

		$('body').on('keydown', function (e) {

			var keyCode = e.keyCode || e.which || e.charCode;

			if (keyCode === 13) {

				$('.confirmBtn').trigger('click');

			};

		});

	};
	

	$.fn[pluginName] = function (options) {

		return this.each(function () {

			if (!$.data(this, pluginName)) {

				$(this, pluginName, new thisPlugin.Class(this, options));

			}

		});

	};

}));

