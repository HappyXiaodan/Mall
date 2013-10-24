/**
 * Statement: Just shut the fuck up!In case you hadn’t noticed, I’m a bit of a stickler for terminology.You motherfucker!!!
 * 
 * Describe: The footer registration form validation of master page.
 * 
 * Further changes, comments: ~
 * 
 * Docs: ~
 * 
 * Original Author: Tony ( Shen Weizhong ).
 * 
 * Version: 0.1.0
 * 
 * Creation Date: 2013.10.07 14:04 ( Tony ).
 * 
 * Last update: 2013.10.10 17:51 ( Tony ).
 * 
 * License: ~
 * 
 * Copyright: ~
 */

(function (name, factory) {
	
	// See http://bugs.jquery.com/ticket/13335
	/*'use strict';*/
	
	var theModule = factory,
		
		// this is considered "safe":
		hasDefine = typeof define === "function" && define.amd,
		
		// hasDefine = typeof define === "function",
		hasExports = typeof module !== "undefined" && module.exports;
	
	if ( hasDefine ){ // AMD Module
		
		define(['jquery', 'cdnjs/jquery_validation/1.11.1/jquery.validate'], theModule);
		
	} else if ( hasExports ) { // Node.js Module (commonjs compatible)
		
		module.exports = theModule;
		
	} else { // Assign to common namespaces or simply the global object (window)
		
		(this.jQuery || this.ender || this.$ || this)[name] = theModule();
		
	}
	
} ('ftrValidation', function (SJ, validationFn) {
	
	// See http://bugs.jquery.com/ticket/13335
	/*'use strict';*/

	var $ = SJ,

		nav = $("nav"),
		
		footerForm = $('#mstFtr1stRgst'),
		
		idxFltRgst = $('#idxFltRgst');
	
	
	
	/**
	 * More rules.
	 */
	
	SJ.validator.addMethod("noWhitespace", function(value, element) {
		
		return this.optional(element) || /^\S+$/i.test(value);
		
	}, "不允许存在空格。");
	
	
	
	/**
	 * Index registration form checker.
	 */

	idxFltRgst.validate({
		
		debug: false,
		
		rules: {
			
			idxUserName: {
				
				required: true,
				
				rangelength: [6, 20]
				
			},
			
			idxUserPass: {
				
				required: true,
				
				rangelength: [8, 20],
				
				noWhitespace: true
				
			},
			
			idxUserPassCheck: {
				
				required: true,
				
				rangelength: [8, 20],
				
				equalTo: "#idxUserPass",
				
				noWhitespace: true
				
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
			
			SJ(error).addClass('absol info box_round');
			
			SJ(element).parent().append(error);
			
		},
		
		success: function(error) {
			
			SJ(error).remove();
			
		},
		
		/**
		 * Submit specified form.
		 * 
		 * 1. Do other things for a valid form.
		 * 
		 * 2. Encode a set of form elements as a string for submission, http://api.jquery.com/serialize/.
		 */
		
		submitHandler: function (form, event) {
			
			/* 1 */
			
			/*SJ(form).serialize();*/ /* 2 */

			//SJ(form).valid();

			form.submit();
			
		}
		
	});
	
	
	
	/**
	 * Footer registration form checker.
	 */

	footerForm.validate({
		
		debug: false,
		
		rules: {
			
			userName: {
				
				required: true,
				
				rangelength: [6, 20]
				
			},
			
			userPass: {
				
				required: true,
				
				rangelength: [8, 20],
				
				noWhitespace: true
				
			},
			
			userPassCheck: {
				
				required: true,
				
				rangelength: [8, 20],
				
				equalTo: "#userPass",
				
				noWhitespace: true
				
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
			
			SJ(error).addClass('absol info box_round');
			
			SJ(element).parent().append(error);
			
		},
		
		success: function(error) {
			
			SJ(error).remove();
			
		},
		
		/**
		 * Submit specified form.
		 * 
		 * 1. Do other things for a valid form.
		 * 
		 * 2. Encode a set of form elements as a string for submission, http://api.jquery.com/serialize/.
		 */
		
		submitHandler: function (form, event) {
			
			/* 1 */
			
			/*SJ(form).serialize();*/ /* 2 */

			//SJ(form).valid();

			form.submit();
			
		}
		
	});
	
}));