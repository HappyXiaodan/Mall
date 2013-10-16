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
			
			btnClass: 'confirmBtn'
			
		};



	thisPlugin.Class = function (obj, opts) {

		this.item = obj;

		this.opts = $.extend({}, defaults, opts);

		this.init();

	};

	thisPlugin.Class.prototype.init = function () {

		var $this = $(this.item),

			opts = this.opts;

		$this.parents('body').fadeIn(800);

		this.clickEvent($this, opts);

	};

	thisPlugin.Class.prototype.clickEvent = function (obj, opts) {

		var obj = obj.find('.' + opts.btnClass);

		obj.each(function () {

			$(this).on('click', function () {

				obj.removeClass('.clickConfirmBtn');

				$(this).addClass('.clickConfirmBtn');

			})

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

