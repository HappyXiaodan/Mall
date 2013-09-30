/**
 * Statement: In case you hadn’t noticed, I’m a bit of a stickler for terminology.You motherfucker!!!
 * 
 * Describe: jQuery Cookie
 * 
 * Further changes, comments: https://github.com/carhartl/jquery-cookie
 * 
 * Docs: https://github.com/carhartl/jquery-cookie
 * 
 * Original Author: Klaus Hartl, Fagner Martins, Shen Weizhong ( Tony Stark )
 * 
 * Version: 1.3.1
 * 
 * Last update: 2013.09.30 10:11 ( Tony )
 * 
 * License: Released under the MIT license
 * 
 * Copyright: ~
 * 
 * Common Syntax:
 * 
 *     $.cookie('the_cookie', 'the_value', {expires: 7, path: '/', domain: 'example.com', secure: false});
 * 
 * example:
 *     
 *     1. Create session cookie => $.cookie('the_cookie', 'the_value');
 *     
 *     2. Create expiring cookie, 7 days => $.cookie('the_cookie', 'the_value', {expires: 7});
 *     
 *     3. Create expiring cookie, valid across entire site => $.cookie('the_cookie', 'the_value', {expires: 7, path: '/'});
 *     
 *     4. Read cookie => $.cookie('the_cookie');
 *     
 *     5. Read all available cookies => $.cookie();
 *     
 *     6. Delete cookie => $.removeCookie('the_cookie');
 *     
 *     7. Delete cookie.Same path as when the cookie was written... => $.removeCookie('the_cookie', {path: '/'});
 *     
 * Note:
 *     
 *     1. By default the cookie value is encoded/decoded when writing/reading.Bypass this by setting raw to true: $.cookie.raw = true;
 *     
 *     2. Turn on automatic storage of JSON objects passed as the cookie value: $.cookie.json = true;
 *     
 *     3. Due to an obscure bug in the underlying WinINET InternetGetCookie implementation, IE’s document.cookie will not return a cookie if it was set with a path attribute containing a filename.
 *     
 *     4. When deleting a cookie, you must pass the exact same path, domain and secure options that were used to set the cookie, unless you're relying on the default options that is.
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
	
} ('cookie', function (SJ) {
	
	// See http://bugs.jquery.com/ticket/13335
	'use strict';
	
	var pluses = /\+/g;
	
	var decode = function (s) {
		
		if (config.raw) {
			
			return s;
			
		}
		
		return decodeURIComponent(s.replace(pluses, ' '));
	};
	
	var decodeAndParse = function (s) {
		
		if (s.indexOf('"') === 0) {
			
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
			
		}
		
		s = decode(s);
		
		try {
			
			return config.json ? JSON.parse(s) : s;
			
		} catch(e) {}
		
	};
	
	var config = SJ.cookie = function (key, value, options) {
		
		// Write
		if (value !== undefined) {
			
			options = SJ.extend({}, config.defaults, options);
			
			if (typeof options.expires === 'number') {
				
				var days = options.expires, t = options.expires = new Date();
				
				t.setDate(t.getDate() + days);
				
			}
			
			value = config.json ? JSON.stringify(value) : String(value);
			
			return (document.cookie = [
				
				config.raw ? key : encodeURIComponent(key),
				
				'=',
				
				config.raw ? value : encodeURIComponent(value),
				
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				
				options.path    ? '; path=' + options.path : '',
				
				options.domain  ? '; domain=' + options.domain : '',
				
				options.secure  ? '; secure' : ''
				
			].join(''));
			
		}
		
		// Read
		var cookies = document.cookie.split('; '),
			
			result = key ? undefined : {};
		
		for (var i = 0, l = cookies.length; i < l; i++) {
			
			var parts = cookies[i].split('='),
				
				name = decode(parts.shift()),
				
				cookie = parts.join('=');
			
			if (key && key === name) {
				
				result = decodeAndParse(cookie);
				
				break;
				
			}
			
			if (!key) {
				
				result[name] = decodeAndParse(cookie);
				
			}
			
		}
		
		return result;
		
	};
	
	config.defaults = {};
	
	SJ.removeCookie = function (key, options) {
		
		if (SJ.cookie(key) !== undefined) {
			
			// Must not alter options, thus extending a fresh object...
			SJ.cookie(key, '', SJ.extend({}, options, { expires: -1 }));
			
			return true;
			
		}
		
		return false;
		
	};
	
}));