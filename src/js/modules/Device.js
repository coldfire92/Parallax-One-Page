
'use strict';

String.prototype.strpos = function(str) {
     if (Array.isArray(str)) {
         for (var i = 0; i < str.length; i++) {
            if (this.indexOf(str[i]) > -1) {
               return true;
            }
         }

         return false;
     } else {
         return (this.indexOf(str) != -1);
     }
};

var _this;

export default class {

   constructor(){
      _this = this;
      this.agent = navigator.userAgent.toLowerCase();
      this.prefix = this.getPrefix();
      this.detectMobile();
      this.detectBrowser();
      this.detectSystem();
   }

   getPrefix(){
      var pre = '', dom;

        if (!window._NODE_) {
            var styles = window.getComputedStyle(document.documentElement, '');
            pre = (Array.prototype.slice
                .call(styles)
                .join('')
                .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
            )[1];
            dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
        } else {
            pre = 'webkit';
        }

         var IE = _this.detect('trident');

         return {
               unprefixed: IE && !_this.detect('msie 9'),
               dom: dom,
               lowercase: pre,
               css: '-' + pre + '-',
               js: (IE ? pre[0] : pre[0].toUpperCase()) + pre.substr(1)
         };
   }


   detect(array) {
        if (typeof array === 'string'){
            array = [array];
        }
        for (var i = 0; i<array.length; i++) {
            if (this.agent.strpos(array[i])) {
               return true;
            }
        }
 
        return false;
   }

   checkForTag(prop) {
        var div = _tagDiv || document.createElement('div'),
            vendors = 'Khtml ms O Moz Webkit'.split(' '),
            len = vendors.length;

        _tagDiv = div;

        if ( prop in div.style ) return true;
        prop = prop.replace(/^[a-z]/, function(val) {
            return val.toUpperCase();
        });

        while(len--) {
            if ( vendors[len] + prop in div.style ) {
                return true;
            }
        }
        return false;
    }

    detectMobile(){
         this.mobile = !window._NODE_ && (!!(('ontouchstart' in window) || ('onpointerdown' in window)) && this.detect(['ios', 'iphone', 'ipad', 'windows', 'android', 'blackberry'])) ? {} : false;
         if (this.mobile && this.detect('windows') && !this.detect('touch')) this.mobile = false;
         if (this.mobile) {
              this.mobile.tablet = Math.max(screen.width, screen.height) > 800;
              this.mobile.phone = !this.mobile.tablet;
         }
    }

    detectBrowser(){
       this.browser = {};
       this.browser.ie = (function() {
           if (_this.detect('msie')) return true;
           if (_this.detect('trident') && _this.detect('rv:')) return true;
           if (_this.detect('windows') && _this.detect('edge')) return true;
       })();
       this.browser.chrome = !this.browser.ie && this.detect('chrome');
       this.browser.safari = !this.browser.chrome && !this.browser.ie && this.detect('safari');
       this.browser.firefox = this.detect('firefox');
       this.browser.version = (function() {
           try {
               if (_this.browser.chrome) return Number(_this.agent.split('chrome/')[1].split('.')[0]);
               if (_this.browser.firefox) return Number(_this.agent.split('firefox/')[1].split('.')[0]);
               if (_this.browser.safari) return Number(_this.agent.split('version/')[1].split('.')[0].charAt(0));
               if (_this.browser.ie) {
                   if (_this.detect('msie')) return Number(_this.agent.split('msie ')[1].split('.')[0]);
                   if (_this.detect('rv:')) return Number(_this.agent.split('rv:')[1].split('.')[0]);
                   return Number(_this.agent.split('edge/')[1].split('.')[0]);
               }
           } catch(e) {
               return -1;
           }
        })();
    }

    detectTransform(){
       this.vendor = this.prefix.css;
       this.transformProperty = (function() {
           switch (this.prefix.lowercase) {
               case 'moz': return '-moz-transform'; break;
               case 'webkit': return '-webkit-transform'; break;
               case 'o': return '-o-transform'; break;
               case 'ms': return '-ms-transform'; break;
               default: return 'transform'; break;
           }
       })();
    }

    detectSystem(){
       this.system = {};
       this.system.retina = window.devicePixelRatio > 1;
       this.system.webworker = typeof window.Worker !== 'undefined';
       this.system.offline = typeof window.applicationCache !== 'undefined';
       if (!window._NODE_) {
           this.system.geolocation = typeof navigator.geolocation !== 'undefined';
           this.system.pushstate = typeof window.history.pushState !== 'undefined';
       }
       this.system.webcam = !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||navigator.mozGetUserMedia || navigator.msGetUserMedia);
       this.system.language = window.navigator.userLanguage || window.navigator.language;
       this.system.webaudio = typeof window.AudioContext !== 'undefined';
       try {
           this.system.localStorage = typeof window.localStorage !== 'undefined';
       } catch (e) {
           this.system.localStorage = false;
       }
       this.system.fullscreen = typeof document[this.prefix.lowercase+'CancelFullScreen'] !== 'undefined';
       this.system.os = (function() {
           if (_this.detect('mac os')) return 'mac';
           else if (_this.detect('windows nt 6.3')) return 'windows8.1';
           else if (_this.detect('windows nt 6.2')) return 'windows8';
           else if (_this.detect('windows nt 6.1')) return 'windows7';
           else if (_this.detect('windows nt 6.0')) return 'windowsvista';
           else if (_this.detect('windows nt 5.1')) return 'windowsxp';
           else if (_this.detect('windows')) return 'windows';
           else if (_this.detect('linux')) return 'linux';
           return 'undetected';
       })();

       this.pixelRatio = window.devicePixelRatio;
    }

    detectStylesProperties(){
       this.styles = {};
       this.styles.filter = checkForTag('filter');
       this.styles.blendMode = checkForTag('mix-blend-mode');
       this.styles.vendor = this.prefix.unthis.prefixed ? '' : this.prefix.js;
       this.styles.vendorTransition = this.styles.vendor.length ? this.styles.vendor+'Transition' : 'transition';
       this.styles.vendorTransform = this.styles.vendor.length ? this.styles.vendor+'Transform' : 'transform';
    }
    
    test(name, test) {
        this[name] = test();
    }
}
