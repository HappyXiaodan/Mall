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
 * Last update:  ( Tony ).
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

	SJ.validator.addMethod("noWhitespace", function(value, element) {
		
		return this.optional(element) || /^\S+$/i.test(value);
		
	}, "不允许存在空格。");
	
	
	
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
	
	SJ('#frmRegister').validate({
		
		debug: true,
		
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
			
		},

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
		
		submitHandler: function (form) {
			
			// do other things for a valid form.
			
			form.submit();
			
		}
		
	});
	
	
	
}));