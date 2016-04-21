	var config = {
	    els2ani: [],
	    mousewheelEvt: (/Firefox/i.test(navigator.userAgent)) ? 'DOMMouseScroll' : 'mousewheel',
	    appendStickyMenu: function() {
	        if (!document.getElementById('stickingMenu')) {
	            var newEl = document.createElement('div'),
	                insideEl = document.createElement('div');
	            newEl.id = "stickingMenu";
	            insideEl.id = "washer";
	            newEl.style.opacity = '0.2';
	            insideEl.style.width = document.querySelector('table').offsetWidth + 'px';
	            insideEl.appendChild(document.querySelector('h3').cloneNode(true));
	            insideEl.querySelector('h3').innerHTML = document.querySelector('h1 span').innerHTML + insideEl.querySelector('h3').innerHTML;
	            document.body.appendChild(newEl);
	            document.getElementById('stickingMenu').appendChild(insideEl);
	            config.animate(document.getElementById('stickingMenu'), 60, 0.03);
	        } else if (document.getElementById('stickingMenu').style.opacity == "0") {
	            config.animate(document.getElementById('stickingMenu'), 60, 0.03);
	        }
	    },
	    restore: function() {
	        var el = document.getElementById('stickingMenu'),
	            opacity = el && el.style.opacity;
	        if (opacity > '0' && opacity | 0 == 1) {
	            config.animate(el, 100, 0.3, true);
	        }
	    },
	    scrollTop: function() {
	        return (document.body.scrollTop || document.documentElement.scrollTop);
	    },
	    stickerEngine: function() {
	        var el = document.querySelector('h3'),
	            marginTop = parseInt(window.getComputedStyle(el, null)['marginTop'].match(/\d+/g)[0]);
	        if (config.scrollTop() > el.offsetTop - el.scrollHeight) {
	            config.appendStickyMenu();
	        }
	        if (config.scrollTop() < (el.offsetTop + el.scrollHeight + marginTop)) {
	            config.restore();
	            config.deanimate();
	        }
	    },
	    deanimate: function() {
	        config.els2ani.forEach(function(i) {
	            i.style.opacity = '0.2';
	        });
	    },
	    animate: function(el, time, step, reverse) {
	        var _interval,
	            direct = function() {
	                if (!el.style.opacity.match(/^1[.]/)) {
	                    el.style.opacity = parseFloat(el.style.opacity) + step;
	                } else {
	                    clearInterval(_interval);
	                }
	            },
	            obverse = function() {
	                if (document.getElementById('stickingMenu').style.opacity > 0) {
	                    document.getElementById('stickingMenu').style.opacity = parseFloat(document.getElementById('stickingMenu').style.opacity) - step;
	                } else {
	                    clearInterval(_interval);
	                    document.getElementById('stickingMenu').style.opacity = 0;
	                }
	            };
	        _interval = setInterval(function() {
	            reverse ? obverse() : direct();
	        }, time);
	    },
	    handler: function(e) {
	        var _config = {
	            runOnce: false,
	            event: window.event || e,
	            delta: (window.event || e).detail ? (window.event || e).detail * (-120) : (window.event || e).wheelDelta,
	            upwards: function() {
	                return this.delta >= 120;
	            },
	            downwards: function() {
	                return this.delta <= -120;
	            },
	            isAllTheWayDown: function() {
	                return window.innerHeight + 30 + (window.scrollY ? window.scrollY : window.pageYOffset) >= document.body.offsetHeight;
	            },
	            ani4short: function() {
	                config.els2ani.forEach(function(i) {
	                    config.animate(i, 110, 0.03);
	                });
	            }	            
	        };
	        _config.delta ? (_config.upwards() && !config.scrollTop() ? config.deanimate() :
	                (_config.downwards() && _config.isAllTheWayDown() ? _config.ani4short() : '')) :
	            (config.scrollTop() ? _config.ani4short() : config.deanimate());	        
				config.stickerEngine();
	    },
	    domReady: function(callback) {
	        config.eventsBinder(document, 'DOMContentLoaded', callback);
	        config.eventsBinder(document, 'onreadystatechange', function() {
	            if (document.readyState === 'complete') {
	                callback();
	            }
	        });
	    },
	    eventsBinder: function(El, event, handler) {
	        if (El && El.addEventListener) {
	            El.addEventListener(event, handler);
	        } else if (El && El.attachEvent) {
	            El.attachEvent('on' + event, handler);
	        }
	    }
	};
	config.domReady(function() {
	    config.els2ani.push(document.querySelector('tr[class="c74"]'));
	    config.eventsBinder(document, config.mousewheelEvt, config.handler);
	    config.eventsBinder(document, 'keyup', config.handler);
	    config.eventsBinder(document, 'mousedown', config.handler);
	    config.eventsBinder(document, 'touchend', config.handler);
	});