/**
 * Statement: gehen zum Teufel
 * 
 * Describe: The javascript boot file of successful application page ( ~/apply/index.html ).
 * 
 * Further changes, comments: ~
 * 
 * Docs: ~
 * 
 * Original Author: Tony ( Shen Weizhong ).
 * 
 * Version: 0.1.0
 * 
 * Creation Date: 2013.10.17 16:45 ( Doris ).
 * 
 * Last update: 2013.10.17 16:45 ( Doris ).
 * 
 * License: ~
 * 
 * Copyright: ~
 */


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

} ('Doverlaymodule', function (SJ) {

	// See http://bugs.jquery.com/ticket/13335
	'use strict'

	var $ = SJ,

		pluginName = 'overlaymodule',

		thisPlugin = {},

		defaults = {
			
			confirmObj: '',

			formId: ''
			
		};



	thisPlugin.Class = function (obj, opts) {

		this.item = obj;

		this.opts = $.extend({}, defaults, opts);

		this.init();

	};



	thisPlugin.Class.prototype.init = function () {

		var $this = $(this.item),

			opts = this.opts;

		this.clickEvent($this, opts);

		this.addressChoose();

	};



	thisPlugin.Class.prototype.clickEvent = function (obj, opts) {

		var overlayObj = $('.' + opts.confirmObj),

			btn = overlayObj.find('button');



		obj.on('click', function (e) {

			console.log(341)

			e.stopPropagation();

			e.preventDefault();

			overlayObj.fadeIn(800);

			btn.removeClass('clickConfirmBtn');

		});



		btn.each(function () {

			$(this).on('click', function (e) {

				e.stopPropagation();

				e.preventDefault();

				var _this = $(this);

				btn.removeClass('clickConfirmBtn');

				_this.addClass('clickConfirmBtn');

				if (_this.attr('id') === 'notCfm') {

					overlayObj.fadeOut(800);

				} else if (_this.attr('id') === 'cfm') {

					$('#' + opts.formId).submit();

				}

			});

		});

	};



	thisPlugin.Class.prototype.addressChoose = function () {

		$('.currentAddressSel').change(function () {

			$(this).find( "option:selected" ).each(function(i, obj) {

				switch ($(this).text()) {

					case '学校地址': {



						$('#otherAddress').hide();

						$('.currentAddressText').val('aaa').parent().show().prev().show();

						break;

					}

					case '家庭地址': {

						$('#otherAddress').hide();

						$('.currentAddressText').val('bbb').parent().show().prev().show();

						break;

					}

					case '其他地址': {

						$('#otherAddress').show();

						$('.currentAddressText').parent().hide().prev().hide();

						break;

					}

					default: {

						$('.currentAddressText').val('').parent().show().parent().prev().show();

						$('#otherAddress').hide();

					}

				}

			});

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

