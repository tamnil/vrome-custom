// Generated by CoffeeScript 1.10.0
(function() {
  var platform;

  platform = {
    mac: navigator.userAgent.indexOf('Mac') !== -1
  };

  window.getSelected = function() {
    return window.getSelection().toString();
  };

  window.times = function(raw, read) {
    if (raw) {
      return KeyEvent.times(read);
    } else {
      return KeyEvent.times(read) || 1;
    }
  };

  window.isElementVisible = function(elem, inFullPage) {
    var $window, elemBottom, elemRight, offset, ref, style, winBottom, winLeft, winRight, winTop;
    if (!elem.is(':visible')) {
      return false;
    }
    style = window.getComputedStyle(elem.get(0));
    if (style.getPropertyValue('visibility') !== 'visible' || style.getPropertyValue('display') === 'none' || style.getPropertyValue('opacity') === '0') {
      return false;
    }
    if (inFullPage) {
      return true;
    }
    $window = $(window);
    ref = [$window.scrollTop(), $window.scrollLeft()], winTop = ref[0], winLeft = ref[1];
    winBottom = winTop + window.innerHeight;
    winRight = winLeft + $window.width();
    offset = elem.offset();
    elemBottom = offset.top + elem.height();
    elemRight = offset.left + elem.width();
    return elemBottom >= winTop && offset.top <= winBottom && offset.left <= winRight && elemRight >= winLeft;
  };

  window.clickElement = function(elem, opt) {
    var e, event, eventType, i, j, len, len1, oldTarget, ref, ref1, ref2, ref3, ref4;
    if (opt == null) {
      opt = {};
    }
    if (platform.mac) {
      opt.meta = opt.ctrl;
    }
    if (elem.length) {
      for (i = 0, len = elem.length; i < len; i++) {
        e = elem[i];
        clickElement(e, opt);
      }
      return;
    }
    oldTarget = null;
    if (opt.meta || opt.ctrl) {
      opt.shift = Option.get('follow_new_tab') === 1;
    } else {
      oldTarget = elem.getAttribute('target');
      elem.removeAttribute('target');
    }
    ref = ['mousedown', 'mouseup', 'click'];
    for (j = 0, len1 = ref.length; j < len1; j++) {
      eventType = ref[j];
      event = document.createEvent('MouseEvents');
      event.initMouseEvent(eventType, true, true, window, 0, 0, 0, 0, 0, (ref1 = opt.ctrl) != null ? ref1 : false, (ref2 = opt.alt) != null ? ref2 : false, (ref3 = opt.shift) != null ? ref3 : false, (ref4 = opt.meta) != null ? ref4 : false, 0, null);
      elem.dispatchEvent(event);
    }
    if (oldTarget) {
      return elem.setAttribute('target', oldTarget);
    }
  };

}).call(this);