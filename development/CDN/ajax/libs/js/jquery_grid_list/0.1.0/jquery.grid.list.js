/**
 * Statement: Just shut the fuck up!In case you hadn’t noticed, I’m a bit of a stickler for terminology.You motherfucker!!!
 * 
 * Describe: jQuery Grid List Plugin.
 * 
 * Further changes, comments: ~
 * 
 * Docs: ~
 * 
 * Original Author: Doris ( Zhang Xiaolu ).
 * 
 * Version: 0.1.0
 * 
 * Creation Date: 2013.10.13 17:55 ( Doris ).
 * 
 * Last update: 2013.10.14 17:30 ( Doris ).
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
		
		define(['jquery', 'cdnjs/jquery_xdomainrequest/1.0.1/jquery.xdomainrequest'], theModule);
		
	} else if ( hasExports ) { // Node.js Module (commonjs compatible)
		
		module.exports = theModule;
		
	} else { // Assign to common namespaces or simply the global object (window)
		
		(this.jQuery || this.ender || this.$ || this)[name] = theModule();
		
	}

} ('gridList', function (SJ) {

	'use strict';

	var $ = SJ;

	/**
	 * common function.
	 *
	 * 1. when click the primary category's links, label 'a' change styles.
	 *    (a.categoryTitle, a.categoryPhone, a.categoryComputer, a.categoryCamera, a.categoryPad)
	 *    
	 * 2. when hover over or click the subcategory's links, label 'a' should change styles.
   	 *    (a in ul.productBrand)
   	 *
   	 * 3. use ajax to get products' information, create products' list and append them to body. 
	 */

	var common = {

		categoryChang: function (obj) { /* 1 */

			obj.parent().parent().find('a').removeClass('categoryAClick');

			obj.addClass('categoryAClick');

			$('div.subCategory').css('display', 'none');

		},

		productChang: function (obj) { /* 2 */

			obj.parent().parent().find('a').removeClass();

			obj.addClass('productAClick');

		},

		getProduct: function (str) { /* 3 */

			var liObj = "";

			$.ajax({

				type: 'GET',

				url: "http://192.168.0.107:8080/fenqimall/gsonUtilResp",

				data: str,  //e.g. "count=0&proType=all&proBrand=PP01"

				dataType: "json",

				timeout: 5000, //Set a timeout (in milliseconds) for the request. 

				error: function () { //A function to be called if the request fails. 

					console.log('Error loading json');

				},

				success: function (data) { //A function to be called if the request succeeds. 

					$.each(data, function (index) {

						liObj += "<li class=\"grid_3\"><a href=\""
						 + "#" + "\"><img src=\"" 
						 + data[index].picNarrow + "\" class=\"productImage\"/></a><h3 class=\"textCenter productTitle\">" 
						 + data[index].productName + "</h3><p class=\"productDesc textCenter\">" 
						 + data[index].productDiscribtion + "</p><h3 class=\"textCenter productPrice fontOrange\">" 
						 + data[index].mthFeeAmt + "元 x " + data[index].payTime + "期</h3><p class=\"textCenter otherPeriods\"><a href=\"" 
						 + "#" + "\" class=\"fontBlue\">查看其他期数 &raquo;</a></p></li>"

					});

					if (data.length < 16) {

						$('.productList').data('loading-status', 'off');

					}

					$('.productList').children('ul').append(liObj);

					$('.productList').find('img').on('error', function () { //If the image cannot be loaded, load placeholder-image.

						$(this).attr('src', 'data:image/png;base64,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');

					});

				}

			});

		}

	};

	/**
	 * Scroll approach window's bottom, load products' information and append products' list to body.
	 * 
	 * 1. Switch which trigger scroll-ajax event. if value is false, switch on.
	 *
	 * 2. less than 250px distant from window bottom, ready to trigger scroll-ajax event.
	 *
	 * 3. Switch on, append '.loading' to bottom of products' list. In case of trigger scroll-ajax event repeatly.
	 *
	 * 4. Time of loading products' information.
	 *
	 * 5. Use $.ajax to get the rest of products' information, create products' list and append them to original list.
	 *
	 * 6. if the request succeeds, remove '.loading'.
	 *
	 * 7. after append new products' list to original list, if new document's height is not equal to original document's height
	 *    (because new products' list has appended to body), reset liObj and switch off, 
	 *    or else new document's height is equal to original height(because there is no more products' information can receive),
	 *    switch always on, no longer trigger scroll-ajax event.
	 */

	var loading = false; /* 1 */

	var scrollEvent = (function (mod) {

		mod.done = function (i, type, brand) {

			var i = i;

			var liObj = "";

			$(window).on('scroll', function () {

				var that = $(this),

					docHeight = $(document).height(),

					limit = docHeight - that.scrollTop() - that.height();

				if (limit < 250) { /* 2 */

					if (!loading) {

						loading = true; /* 3 */ 

						if ($('.productList').data('loading-status') === 'off') {

							$('<h3/>').addClass('row loading').html('已加载完成').insertAfter($('.productList').find('ul'));

						} else {

							$('<h3/>').addClass('row loading').html('正在加载...').insertAfter($('.productList').find('ul'));

						}
						
						i = i + 1; /* 4 */

						$.ajax({  /* 5 */

							type: 'GET',

							url: "http://192.168.0.107:8080/fenqimall/gsonUtilResp",

							data: "count=" + i + "&proType=" + type + "&proBrand=" + brand,

							dataType: "json",

							timeout: 5000,

							error: function () {

						        console.log('Error loading json');

						    },

							success: function (data) { 

								$.each(data, function (index) {

									liObj += "<li class=\"grid_3\"><a href=\""
									 + "#" + "\"><img src=\"" 
									 + data[index].picNarrow + "\" class=\"productImage\"/></a><h3 class=\"textCenter productTitle\">" 
									 + data[index].productName + "</h3><p class=\"productDesc textCenter\">" 
									 + data[index].productDiscribtion + "</p><h3 class=\"textCenter productPrice fontOrange\">" 
									 + data[index].mthFeeAmt + "元 x " + data[index].payTime + "期</h3><p class=\"textCenter otherPeriods\"><a href=\"" 
									 + "#" + "\" class=\"fontBlue\">查看其他期数 &raquo;</a></p></li>"

								});

								if (data.length < 16) {

									$('.productList').data('loading-status', 'off');

								}

								$('.loading').remove(); /* 6 */ 
								
								$('.productList').children('ul').append(liObj).delay(500).queue(function () { /* 7 */

									if ( docHeight !==  $(document).height()) {

										liObj = '';

										loading = false;

									} else {

										$.dequeue(this);

									}

									$.dequeue(this);

								});

								$('.productList').find('img').on('error', function () {

									$(this).attr('src', 'data:image/png;base64,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');

								});

							}

						});

					}

				}

			});

		};

		return mod;

	} (scrollEvent || {}));



	/**
	 * 'a#allPro' clickEvent.
	 *
	 * 1. after click 'a#allPro'(数码分期), reset window's scrolling event.
	 *
	 * 2. change 'a#allPro' style.
	 *
	 * 3. switch other buttons off, switch current button on, empty products' list and append new products to body.
	 */

	var allPro = (function (mod) {

		mod.showList = function () {

			$('#allPro').on('click', function (e) {

				e.preventDefault();

				$('.productList').data('loading-status', 'on');

				$(window).off('scroll'); /* 1 */

				loading = false;

				scrollEvent.done(0, "all", "all");

				common.categoryChang($(this)); /* 2 */

				$('a').not('#allPro').data('statu', 'off'); /* 3 */

				if ($(this).data('statu') === 'off') {

					$('.productList').children('ul').empty();

					common.getProduct("count=0&proType=all&proBrand");

					$(this).data('statu', 'on');

				}

			}).trigger('click');

		};

		return mod;

	} (allPro || {}));



	/**
	 * 'a#categoryPhone' clickEvent.
	 *
	 * 1. change 'a#categoryPhone' style.
	 *
	 * 2. show brand list.
	 *
	 * 3. bind brand buttons' click event.
	 */

	var phone = (function (mod) {

		mod.showList = function () {

			$('#categoryPhone').on('click', function (e) {

				e.preventDefault();

				common.categoryChang($(this)); /* 1 */

				$('.subCategoryPhone').show(); /* 2 */

				productBrand.clickEvent(); /* 3 */

			});

		};

		return mod;

	} (phone || {}));



	/**
	 * 'a#categoryComputer' clickEvent.
	 *
	 * 1. change 'a#categoryComputer' style.
	 *
	 * 2. show brand list.
	 *
	 * 3. bind brand buttons' click event.
	 */

	var computer = (function (mod) {

		mod.showList = function () {

			$('#categoryComputer').on('click', function (e) {

				e.preventDefault();

				common.categoryChang($(this)); /* 1 */

				$('.subCategoryComputer').show(); /* 2 */

				productBrand.clickEvent(); /* 3 */

			});

		};

		return mod;

	} (computer || {}));



	/**
	 * 'a#categoryCamera' clickEvent.
	 *
	 * 1. change 'a#categoryCamera' style.
	 *
	 * 2. show brand list.
	 *
	 * 3. bind brand buttons' click event.
	 */

	var camera = (function (mod) {

		mod.showList = function () {

			$('#categoryCamera').on('click', function (e) {

				e.preventDefault();

				common.categoryChang($(this)); /* 1 */

				$('.subCategoryCamera').show(); /* 2 */

				productBrand.clickEvent(); /* 3 */

			});

		};

		return mod;

	} (camera || {}));



	/**
	 * 'a#categoryPad' clickEvent.
	 *
	 * 1. change 'a#categoryPad' style.
	 *
	 * 2. show brand list.
	 *
	 * 3. bind brand buttons' click event.
	 */

	var pad = (function (mod) {

		mod.showList = function () {

			$('#categoryPad').on('click', function (e) {

				e.preventDefault();

				common.categoryChang($(this)); /* 1 */

				$('.subCategoryPad').show(); /* 2 */

				productBrand.clickEvent(); /* 3 */

			});

		};

		return mod;

	} (pad || {}));



	/**
	 * brand buttons' clickEvent.
	 *
	 * 1. change brand buttons' style.
	 *
	 * 2. switch other buttons off, switch current button on, empty products' list and append new products to body.
	 */

	var productBrand = (function (mod) {

		mod.clickEvent = function () {

			$('.productBrand:visible').find('li').find('a').each(function (index) {

				$(this).on('click', function (e) {

					e.preventDefault();

					common.productChang($(this)); /* 1 */

					$('a').not($(this)).data('statu', 'off'); /* 2 */

					if ($(this).data('statu') === 'off') {

						var brand = $(this).data('brand'),

							type = $(this).parent().parent().parent().data('type');

						$('.productList').children('ul').empty();

						common.getProduct("count=0&proType=" + type + "&proBrand=" + brand);

						$('.productList').data('loading-status', 'on');

						$(window).off('scroll');

						loading = false;

						scrollEvent.done(0, type, brand);

						$(this).data('statu', 'on');

					}

				});

			}).first().trigger('click');

		};

		return mod;

	} (productBrand || {}));

	return {

		init: function () {


			/**
			 * allPro & phone & computer & camera & pad & productBrand can be optimized!!!!!!
			 */

			allPro.showList();

			phone.showList();

			computer.showList();

			camera.showList();

			pad.showList();

		}

	};

}));

