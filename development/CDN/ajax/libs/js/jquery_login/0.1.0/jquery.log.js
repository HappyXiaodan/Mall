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

		defaults = {
            
            debug: false
            
        },

		submitStatus = false,

		checkResult = {

			user: false,

			pass: false

		};
    
    var check = function (classObj, obj) {
        
        if (!classObj.methods.notNull(obj)) { // If it is empty.
                
            $('.errorMsg').show().find('i').text('请输入' + obj.parent().prev().text() + ' ');
            
        } else {
            
            if (obj.attr('id') === 'userName') {
                
                var str = "6-20位字母、数字或 \' _ \' (必须以字母开头)",
                    
                    bol = classObj.methods.uName(obj);
                
                if (!bol) {
                    
                    $('.errorMsg').show().find('i').text(str);
                    
                    checkResult.user = false;
                    
                } else {
                    
                    $('.errorMsg').hide();
                    
                    checkResult.user = true;
                    
                }
                
            } else if (obj.attr('id') === 'userPassword') {
                
                var str = "请输入8到20位数字和字母的组合(不可使用特殊字符)",
                    
                    bol = classObj.methods.pwd(obj);
                
                if (!bol) {
                    
                    $('.errorMsg').show().find('i').text(str);
                    
                    checkResult.pass = false;
                    
                } else {
                    
                    $('.errorMsg').hide();
                    
                    checkResult.pass = true;
                    
                }
                
            }
            
        }
        
    };

	thisPlugin.Class = function (obj, options) {

		this.items = obj;

		this.opts = $.extend({}, defaults, options);

 		this.init();

	};

	thisPlugin.Class.prototype.init = function () {
        
		var that = $(this.items);
        
		this.onFocusIn(that);
        
		this.onFocusOut(that);
        
		this.handleSubmit(that, this.opts);
        
	};

	thisPlugin.Class.prototype.methods = {
        
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
    
    

	thisPlugin.Class.prototype.onFocusOut = function (that) {
        
		var obj = that.find('input'),
            
			classObj = this;
        
		obj.on('focusout', function () {
            
			var _this = $(this);
            
			check(classObj, _this);
            
		});
        
	};

	thisPlugin.Class.prototype.onFocusIn = function (that) {

		var obj = that.find('input');

		obj.on('focusin', function () {

			var _this = $(this);

			if (_this.data('error') === 'what the fuck!') {

				$('.errorMsg').hide();

			}

		});

	};

	thisPlugin.Class.prototype.handleSubmit = function (that, opts) {
        
		var iptUser = that.find('input[type=text]'),
            
			iptPass = that.find('input[type=password]'),
            
			iptSubmit = that.find('button');
        
		iptSubmit.on('click', function () {
            
			submitStatus = checkResult.user && checkResult.pass;
    
            if (!submitStatus) {
                
                var asd = "6-20位字母、数字或 \' _ \' (必须以字母开头)";
                
                    $('.errorMsg').show().find('i').text(asd);
                
                return false;
                
            } else {
                
                if (submitStatus) {
                    
                    if (!opts.debug) {
                        
                        that.submit();
                        
                    } else {
                        
                        console.log(that.serialize());
                        
                        return false;
                        
                    }  
                    
                } else { // Here, just for the valition when two inputs are both empty.
    
                    $.each(checkResult, function (idx, obj) {
    
                        if (obj === false) {
    
                            if (idx === 0) {
    
                                var str = "6-20位字母、数字或 \' _ \' (必须以字母开头)";
    
                                $('.errorMsg').show().find('i').text(str);
    
                            } else {
    
                                var str = "请输入8到20位数字和字母的组合(不可使用特殊字符)";
    
                                $('.errorMsg').show().find('i').text(str);
    
                            }
    
                            iptUser.data('error', 'what the fuck!');
    
                            iptPass.data('error', 'what the fuck!');
    
                            return false;
    
                        }
    
                    });
    
                }
    
            }
            
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

