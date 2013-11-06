/**
 * Statement: gehen zum Teufel.
 *
 * Describe: The javascript boot file of recharge page ( pay/recharge html ).
 * 
 * Further changes, comments: ~
 * 
 * Docs: ~
 * 
 * Original Author: Doris.
 * 
 * Version: 0.1.0
 * 
 * Creation Date: 2013.10.19 13:37 ( Doris ).
 * 
 * Last update: 2013.10.21 09:20 ( Doris ).
 * 
 * License: ~
 * 
 * Copyright: ~
 */

(function (window, document, requirejs, require) {
    
    'use strict';
    
    var boot = boot || {};
    
    boot.getAgent = function () {
        
        return navigator.userAgent.toLowerCase();
        
    };
    
    boot.isIE = function(userAgent) {
        
        var agent = userAgent || this.getAgent();
        
        return !!agent.match(/msie/i);
        
    };
    
    boot.isGteIE9 = function(userAgent) {
        
        var agent = userAgent || this.getAgent(),
            
            match = agent.match(/msie\D*([\.\d]*)/i),
            
            version = 0;
        
        if (match && match[1]) {
            
            version = match[1];
            
        }
        
        return version >= 9;
        
    };
    
    boot.req = function (jquery) {
        
        requirejs.config({
            
            baseUrl: '../CDN',
            
            enforceDefine: false,
            
            paths: {
                
                'jquery': jquery,
                
                'cdnjs': 'ajax/libs/js'
                
            },
            
            waitSeconds: 60,
            
            map: {
                
                '*': {'jquery': 'cdnjs/jquery_private/jquery.private.min'},
                
                'cdnjs/jquery_private/jquery.private.min': {'jquery': 'jquery'}
                
            }
            
        });
        
        require([
            
            'cdnjs/modernizr_amd/modernizr.min',
            
            'jquery',
            
            'cdnjs/jquery_cookie/1.3.1/jquery.cookie.min',
            
            'cdnjs/gridder/0.1.0/gridder',
            
            'cdnjs/jquery_title_modify/title.modify'
        
        ], function (modernizr, SJ, cookie, gridder, modifyTitle) {
            
            SJ(function ($) {
                
                var nav = $("nav"),
                    
                    overlayObj = $('.chooseBank'),
                    
                    closeBtn = $('.closeChoose'),
                    
                    respondIpt = $('.selectedBank'),
                    
                    overlayLink = $('.otherPaymentLink');
                
                
                
                /**
                 * Navigation Demo.
                 */
                
                nav.find('a').on('click', function (e) {
                    
                    e.preventDefault();
                    
                    $(this).addClass('selected').closest('li').siblings().children().removeClass('selected');
                    
                });



                /**
                 * click input's background image also can choose.
                 */
                
                overlayObj.find('.inputBlockLevel').on('click', function () {
                    
                    $(this).children('input').attr('checked', true);
                    
                });



                /**
                 * click link to show overlay, choose bank.
                 */
                
                overlayLink.on('click', function (e) {
                    
                    e.preventDefault();
                    
                    overlayObj.fadeIn(500).find('button').on('click', function (e) {
                        
                        var checkedObj = overlayObj.find('input[name=chooseBank]:checked'),
                            
                            checkedObjVal = checkedObj.val(),
                            
                            checkedId = checkedObj.parent().attr('id');
                        
                        e.preventDefault();
                        
                        respondIpt.attr('id', checkedId).find('input').val(checkedObjVal);
                        
                        overlayObj.fadeOut(500);
                        
                    });
                    
                });



                /**
                 * click button to close overlay.
                 */
                
                closeBtn.on('click', function (e) {
                    
                    e.preventDefault();
                    
                    overlayObj.fadeOut(500);
                    
                });
                
                
                
                /**
                 * Development dependency: grid system.
                 */
                
                gridder;
                
                
                
                /**
                 * Title modify component( Public ) test.
                 */
                
                modifyTitle();
                
            });
            
        });
        
    };
    
    boot.judgement = function (opts) {
        
        if (this.isIE()) {
            
            this.isGteIE9() ? this.req(opts.jq2x) : this.req(opts.jq1x);
            
        } else {
            
            this.req(opts.jq2x);
            
        }
        
    };
    
    /*             ___   ___
                 \  \  \  \
       (___)   ___\__\__\__\__
       (o o)   |  O O O O O O|
      --\ /----+-------------+-------/
      |  O                          /
       \                           /
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ => moo__Steerage ...
    */
    
    boot.judgement({
        
        jq1x: 'ajax/libs/js/jquery/1.10.2/jquery.min',
        
        jq2x: 'ajax/libs/js/jquery/2.0.3/jquery.min'
        
    });
        
}(window, document, requirejs, require));