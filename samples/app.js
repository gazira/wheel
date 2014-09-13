var $ = require('component/jquery@1.0.0');
require('../index');

$(function () {
    $('#box').wheel(function(e, direction, browser) {
        console.log(direction);
    });
});
