'use strict';
$(function(o) {
  var t = o('html, body');
  o('#scroll_top').on('click', function() {
    return t.animate({ scrollTop: 0 }, 600), !1;
  });
});
