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
	'use strict';
	
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
	
} ('ftrValidation', function (SJ) {
	
	// See http://bugs.jquery.com/ticket/13335
	'use strict';
	
	
	
	/**
	 * 1. Plugin Name.
	 * 
	 * 2. [Major Version Number].[Minor Version Number].[Revision Number | Build Number].In strict accordance with habits of C.The minor version number of stable version is an even number, and the minor version number of development version is an odd number.
	 * 
	 * 3. JP = {}, JP(Abbreviations): jQuery Plugin, The package all functions are stored within.
	 */
	
	var pluginName = 'check',/* 1 */
		
		version = '0.1.0',/* 2 */
		
		JP = JP || {};/* 3 */
	
	
	
	/**
	 * Describe: Default settings.
	 */
	
	JP.Settings = {
		
		rules: {
			
			userName: {
				
				required: true,
				
				rangelength: [2, 5]
				
			},
			
			userPass: {
				
				required: true,
				
				rangelength: [6, 20],
				
				noWhitespace: true
				
			},
			
			userPassCheck: {
				
				required: true,
				
				rangelength: [6, 20],
				
				equalTo: "#userPass",
				
				noWhitespace: true
				
			}
			
		}
		
	};
	
	
	
	/**
	 * Describe: Real plug-in constructor.
	 * 
	 * 1. Combined with module mode.
	 * 
	 * 2. Build main options and element specific options(support the metadata plugin). This changed line tests to see if the Metadata Plugin is installed, And if it is, it extends our options object with the extracted metadata.
	 */
	
	JP.Plugin = (function () {/* 1 */
		
		var Class = function (obj, options) {
			
			this.obj = obj;
			
			this.final_opts = SJ.meta ? SJ.extend({}, JP.Settings, options, obj.data()) : SJ.extend({}, JP.Settings, options);/* 2 */
			
			this.init();
			
		};
		
		return Class;
		
	}());
	
	
	
	/**
	 * Describe: Initialization logic.
	 */
	
	JP.Plugin.prototype.init = function () {
		
		var opts = this.final_opts,
			
			$this = SJ(this.obj);
		
		this.addFunctions();
		
		this.validate($this, opts);
		
	};
	
	/**
			.-=-==--==--.
		   ..-=="  ,'o`)      `.
		 ,'         `"'         \
		:  (                     `.__...._
		|                  )    /         `-=-.
		:       ,vv.-._   /    /               `---==-._
		 \/\/\/VV ^ d88`;'    /                         `.
			 ``  ^/d88P!'    /             ,              `._
				^/    !'   ,.      ,      /                  "-,,__,,--'""""-.
			   ^/    !'  ,'  \ . .(      (         _           )  ) ) ) ))_,-.\
			  ^(__ ,!',"'   ;:+.:%:a.     \:.. . ,'          )  )  ) ) ,"'    '
			  ',,,'','     /o:::":%:%a.    \:.:.:         .    )  ) _,'
			   """'       ;':::'' `+%%%a._  \%:%|         ;.). _,-""
					  ,-='_.-'      ``:%::)  )%:|        /:._,"
					 (/(/"           ," ,'_,'%%%:       (_,'
									(  (//(`.___;        \
									 \     \    `         `
									  `.    `.   `.        :
										\. . .\    : . . . :
										 \. . .:    `.. . .:
										  `..:.:\     \:...\
										   ;:.:.;      ::...:
										   ):%::       :::::;
									   __,::%:(        :::::
									,;:%%%%%%%:        ;:%::
									  ;,--""-.`\  ,=--':%:%:\
									 /"       "| /-".:%%%%%%%\
													 ;,-"'`)%%)
													/"      "| => dino
	*/
	
	JP.Plugin.prototype.addFunctions = function () {
		
		SJ.validator.addMethod("noWhitespace", function(value, element) {
			
			return this.optional(element) || /^\S+$/i.test(value);
			
		}, "不允许存在空格。");
		
	};
	
	
	
	/**
													   .7
										   \       , //
										   |\.--._/|//
										  /\ ) ) ).'/
										 /(  \  // /
										/(   J`((_/ \
									   / ) | _\     /
									  /|)  \  eJ    L
									 |  \ L \   L   L
									/  \  J  `. J   L
									|  )   L   \/   \
								   /  \    J   (\   /
				 _....___         |  \      \   \```
		  ,.._.-'        '''--...-||\     -. \   \
		.'.=.'                    `         `.\ [ Y
	   /   /                                  \]  J
	  Y / Y                                    Y   L
	  | | |          \                         |   L
	  | | |           Y                        A  J
	  |   I           |                       /I\ /
	  |    \          I             \        ( |]/|
	  J     \         /._           /        -tI/ |
	   L     )       /   /'-------'J           `'-:.
	   J   .'      ,'  ,' ,     \   `'-.__          \
		\ T      ,'  ,'   )\    /|        ';'---7   /
		 \|    ,'L  Y...-' / _.' /         \   /   /
		  J   Y  |  J    .'-'   /         ,--.(   /
		   L  |  J   L -'     .'         /  |    /\
		   |  J.  L  J     .-;.-/       |    \ .' /
		   J   L`-J   L____,.-'`        |  _.-'   |
			L  J   L  J                  ``  J    |
			J   L  |   L                     J    |
			 L  J  L    \                    L    \
			 |   L  ) _.'\                    ) _.'\
			 L    \('`    \                  ('`    \
			  ) _.'\`-....'                   `-....'
			 ('`    \
			  `-.___/
	*/
	
	JP.Plugin.prototype.validate = function ($this, opts) {
		
		$this.validate({
			
			debug: true,
			
			rules: opts.rules,
			
			onfocusout: function(element) { 
				
				SJ(element).valid();
				
			},
			
			onkeyup: function(element) {
				
				SJ(element).valid();
				
			},
			
			errorElement: 'div',
			
			errorPlacement: function (error, element) {
				
				error.addClass('absol info box_round');
				
				error.insertAfter(element);
				
			},
			
			success: function(error) {
				
				error.remove();
				
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
				
				SJ(form).serialize(); /* 2 */
				
				console.log(SJ(form).serialize());
				
				//form.submit();
				
			}
			
		});
		
	};
	
	
	
	/**
	 * Describe: jQuery plugin implementation(definition or registration), real plug-in package, to prevent multiple instances.
	 * 
	 * 1. 'this' refers to the jQuery instance, and not the element.
	 */
	
	SJ.fn[pluginName] = function (options) {
		
		return this.each(function () {/* 1 */
			
			if (!SJ.data(this, "plugin_" + pluginName)) {/* 1 */
				
				SJ.data(this, "plugin_" + pluginName, new JP.Plugin(this, options));/* 1 */
				
			}
			
		});
		
	};
	
}));