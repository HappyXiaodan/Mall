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

} ('DLogin', function (SJ) {

	// See http://bugs.jquery.com/ticket/13335
	'use strict'

	var $ = SJ,

		pluginName = 'login',

		thisPlugin = {},

		defaults = {};

	thisPlugin.Class = function (obj, options) {

		this.items = obj;

		this.opts = $.extend({}, defaults, options);

 		this.init();

	};

	thisPlugin.Class.prototype.init = function () {

		var $this = $(this.items);

		thisPlugin.focusEvent($this, this.opts);

	};

	var methods = {

		notNull: function (obj) {

			return obj.val() !== '' ? true : false;

		},

		pwd: function (obj) {

			var val = obj.val();

			return /^[A-Za-z0-9]{8,20}$/g.test(val);

		},

		uName: function (obj) {

			var val = obj.val();

			return /^[a-zA-Z][a-zA-Z0-9_]{5,19}$/g.test(val);

		}

	};






	thisPlugin.focusEvent = function (obj, opts) {

		var _this = this;

		obj.find('input').on('focusout', function () {

			var $this = $(this);

			// if ($this.attr('id') === 'userName') {

			// 	if (!methods.notNull($this)) {

			// 		$('.errorMsg').show().text("请输入" + $this.parent().prev().text() + " ");

			// 		obj.data('error', 'notNull');

			// 	} else {

			// 		if (!methods.uName($this)) {

			// 			$('.errorMsg').show().text("6-20位字母、数字或 \' _ \' (必须以字母开头)");

			// 			obj.data('error','uName');

			// 		}

			// 	}

			// } else if ($this.attr('id') === 'userPassword') {

			// 	if (!methods.notNull($this)) {

			// 		$('.errorMsg').show().text("请输入" + $this.parent().prev().text() + " ");

			// 		obj.data('error', 'notNull');

			// 	} else {

			// 		if (!methods.pwd($this)) {

			// 			$('.errorMsg').show().text("请输入8到20位数字和字母的组合(不可使用特殊字符)");

			// 			obj.data('error','userPassword');

			// 		}

			// 	}

			// // }

			// console.log(obj.data('error'));

			if (!methods.notNull($this)) {

				$('.errorMsg').show().find('i').text('请输入' + $this.parent().prev().text() + ' ');

				$this.data('error', 'on');

			} else {

				if ($this.attr('id') === 'userName') {

					var str = "6-20位字母、数字或 \' _ \' (必须以字母开头)",

						bol = methods.uName($this);

					if (!bol) {

						$('.errorMsg').show().find('i').text(str);

						$this.data('error', 'on');

					} else {

						$('.errorMsg').hide();

						$this.data('error', 'off');

					}

				} else if ($this.attr('id') === 'userPassword') {

					var str = "请输入8到20位数字和字母的组合(不可使用特殊字符)",

						bol = methods.pwd($this);

					if (!bol) {

						$('.errorMsg').show().find('i').text(str);

						$this.data('error', 'on');

					} else {

						$('.errorMsg').hide();

						$this.data('error', 'off');

					}

				}

			}

			console.log($('#userName').data('error'), $('#userPassword').data('error'));
























































		});

	}





	$.fn[pluginName] = function (options) {

		return this.each(function () {

			if (!$.data(this, pluginName)) {

				$(this, pluginName, new thisPlugin.Class(this, options));

			}

		})

	};

}));

