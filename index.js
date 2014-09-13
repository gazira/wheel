var $ = require('jquery');
var browser = require('browser');

var r = function (node) {
    node = node[0] || node;
    if (browser.ie) {
        node.attachEvent('onmousewheel', function (e) {
            e = window.event;
            var prevent = function () {
                node.scrollTop += e.wheelDelta > 0 ? -60 : 60;
                e.returnValue = false;
            };
            $(node).trigger('wheel', [e.wheelDelta > 0 ? 'up' : 'down', prevent, 'ie']);// e.wheelDelta > 0 向上滚动
        });
    } else if (browser.firefox) {
        node.addEventListener('DOMMouseScroll', function (e) {
            $(node).trigger('wheel', [e.detail < 0 ? 'up' : e.detail > 0 ? 'down' : '', function () {
                e.preventDefault();
            }, 'firefox']);
        }, false);
    } else {
        node.addEventListener('mousewheel', function (e) {
            $(node).trigger('wheel', [e.wheelDelta >= 0 ? 'up' : e.wheelDelta <= 0 ? 'down' : '', function () {
                e.returnValue = false;
            }, 'standard']);
        }, false);
    }
};

$.event.special.wheel = {
    setup: function() {
        var el = this;
        r(el);
    },
    teardown: function() {

    }
};

$.fn.wheel = function(callback) {
    return this.on('wheel', callback);
};

module.exports = r;