/**
 * Statement: In case you hadn’t noticed, I’m a bit of a stickler for terminology.You motherfucker!!!
 * 
 * Describe: Gets or sets the title of the document.
 * 
 * Further changes, comments: ~
 * 
 * Docs: https://developer.mozilla.org/en-US/docs/Web/API/document.title
 * 
 *       http://www.whatwg.org/specs/web-apps/current-work/multipage/dom.html#document.title
 *       
 *       http://www.w3schools.com/jsref/dom_obj_document.asp
 * 
 * Original Author: Tony ( Shen Weizhong ).
 * 
 * Version: 0.1.0
 * 
 * Last update: 2013.09.30 09:53 ( Tony ).
 * 
 * License: ~
 * 
 * Copyright: ~
 * 
 * Example: require(['title.modify'], function (modifyTitle) { modifyTitle(); });
 */

/**
 * 1. The title property is supported in all major browsers.
 * 
 * 2. The text to appear in the title bar of the window.
 * 
 * 3. This works fine in all browser.
 */

define(['jquery'], function (SJ) {

	return function () {
		
		SJ(document).attr('title'/* 1 */, SJ.trim(SJ('#pageTitle').text()/* 2 */)); /* 3 */
		
	};

});