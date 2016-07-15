// Generated by CoffeeScript 1.10.0
(function() {
  window.Scroll = (function() {
    var HORIZONTAL_MOMENT, VERTICAL_MOMENT, biggestHorizontallyScrollable, biggestVerticallyScrollable, currentlySelectedElement, elementHeight, elementWidth, generateWheelEvent, getBiggestScrollable, getClosestScrollable, getRealOffset, isElementScrolledToEnd, isScrollableElement, pageIsHorizontallyScrollable, pageIsVerticallyScrollable, ref, ref1, scroll, scrollBy, scrollElement;

    function Scroll() {}

    ref = [], currentlySelectedElement = ref[0], biggestVerticallyScrollable = ref[1], biggestHorizontallyScrollable = ref[2];

    ref1 = [15, 15], VERTICAL_MOMENT = ref1[0], HORIZONTAL_MOMENT = ref1[1];

    elementWidth = function(element) {
      return element.scrollWidth || $(element).width();
    };

    elementHeight = function(element) {
      return element.scrollHeight || $(element).height();
    };

    isScrollableElement = function(element) {
      return element && (element !== document.body && element !== document.documentElement) && isElementVisible($(element), true);
    };

    getBiggestScrollable = function(direction) {
      var biggestScrollable;
      biggestScrollable = null;
      $(document.documentElement).find(direction).each(function(_, element) {
        var area, biggestArea;
        if (!isScrollableElement(element)) {
          return;
        }
        area = elementWidth(element) * elementHeight(element);
        if (biggestScrollable) {
          biggestArea = elementWidth(biggestScrollable) * elementHeight(biggestScrollable);
        } else {
          biggestArea = -1;
        }
        if (area > biggestArea) {
          return biggestScrollable = element;
        }
      });
      return biggestScrollable;
    };

    getClosestScrollable = function(element, direction) {
      return $(element).closest(direction).get(0);
    };

    $(document.documentElement).click(function(e) {
      return currentlySelectedElement = getClosestScrollable(e.target, ':scrollable');
    });

    getRealOffset = function(element, offsetX, offsetY) {
      var $element;
      $element = $(element);
      if (Math.abs(offsetX) === Infinity) {
        offsetX = elementWidth(element) * Math.sign(offsetX);
      }
      if (Math.abs(offsetY) === Infinity) {
        offsetY = elementHeight(element) * Math.sign(offsetY);
      }
      return [offsetX, offsetY];
    };

    generateWheelEvent = function(element, offsetX, offsetY) {
      var event, ref2;
      ref2 = getRealOffset(element, offsetX, offsetY), offsetX = ref2[0], offsetY = ref2[1];
      event = document.createEvent('WheelEvent');
      event.initWebKitWheelEvent(-offsetX, -offsetY);
      return element.dispatchEvent(event);
    };

    scrollBy = function(offsetX, offsetY) {
      var ref2;
      ref2 = getRealOffset(document, offsetX, offsetY), offsetX = ref2[0], offsetY = ref2[1];
      return window.scrollBy(offsetX, offsetY);
    };

    pageIsHorizontallyScrollable = function() {
      return $(document).width() > window.innerWidth;
    };

    pageIsVerticallyScrollable = function() {
      return $(document).height() > window.innerHeight;
    };

    scrollElement = function(element, offsetX, offsetY) {
      if (isScrollableElement(element)) {
        return generateWheelEvent(element, offsetX, offsetY);
      } else {
        return scrollBy(offsetX, offsetY);
      }
    };

    isElementScrolledToEnd = function(offsetX, offsetY, element) {
      var $element;
      if (!element) {
        return false;
      }
      $element = $(element);
      $element.height($element.height());
      $element.width($element.width());
      return (offsetY > 0 && element.scrollHeight - element.scrollTop === element.clientHeight) || (offsetY < 0 && element.scrollTop === 0) || (offsetX > 0 && element.scrollWidth - element.scrollLeft === element.clientWidth) || (offsetX < 0 && element.scrollLeft === 0);
    };

    scroll = function(offsetX, offsetY) {
      var element;
      if (isScrollableElement(currentlySelectedElement)) {
        element = currentlySelectedElement;
        while (isElementScrolledToEnd(offsetX, offsetY, element)) {
          element = getClosestScrollable(element.parentElement, (offsetX !== 0 ? ':horizontally-scrollable' : ':vertically-scrollable'));
        }
        return scrollElement(element, offsetX, offsetY);
      } else if (offsetX !== 0) {
        if (pageIsHorizontallyScrollable()) {
          return scrollBy(offsetX, offsetY);
        }
        if (!isScrollableElement(biggestHorizontallyScrollable)) {
          biggestHorizontallyScrollable = getBiggestScrollable(':horizontally-scrollable');
        }
        return scrollElement(biggestHorizontallyScrollable, offsetX, offsetY);
      } else {
        if (pageIsVerticallyScrollable()) {
          return scrollBy(offsetX, offsetY);
        }
        if (!isScrollableElement(biggestVerticallyScrollable)) {
          biggestVerticallyScrollable = getBiggestScrollable(':vertically-scrollable');
        }
        return scrollElement(biggestVerticallyScrollable, offsetX, offsetY);
      }
    };

    Scroll.top = function() {
      return scroll(0, -Infinity);
    };

    desc(Scroll.top, 'Scroll to the top of the page');

    Scroll.bottom = function() {
      return scroll(0, Infinity);
    };

    desc(Scroll.bottom, 'Scroll to the bottom of the page');

    Scroll.first = function() {
      if (times(true, true) === 0) {
        return scroll(-Infinity, 0);
      }
    };

    desc(Scroll.first, 'Scroll to the leftmost of the page');

    Scroll.last = function() {
      return scroll(Infinity, 0);
    };

    desc(Scroll.last, 'Scroll to the rightmost of the page');

    Scroll.up = function() {
      return scroll(0, times() * -VERTICAL_MOMENT);
    };

    desc(Scroll.up, 'Scroll up');

    Scroll.down = function() {
      return scroll(0, times() * VERTICAL_MOMENT);
    };

    desc(Scroll.down, 'Scroll down');

    Scroll.left = function() {
      return scroll(times() * -HORIZONTAL_MOMENT, 0);
    };

    desc(Scroll.left, 'Scroll left');

    Scroll.right = function() {
      return scroll(times() * HORIZONTAL_MOMENT, 0);
    };

    desc(Scroll.right, 'Scroll right');

    Scroll.nextPage = function() {
      return scroll(0, times() * window.innerHeight * 0.95);
    };

    desc(Scroll.nextPage, 'Scroll down {count} full page');

    Scroll.prevPage = function() {
      return scroll(0, times() * -window.innerHeight * 0.95);
    };

    desc(Scroll.prevPage, 'Scroll up {count} full page');

    Scroll.nextHalfPage = function() {
      return scroll(0, times() * window.innerHeight / 2);
    };

    desc(Scroll.nextHalfPage, 'Scroll down {count} half page');

    Scroll.prevHalfPage = function() {
      return scroll(0, times() * -window.innerHeight / 2);
    };

    desc(Scroll.prevHalfPage, 'Scroll up {count} half page');

    Scroll.toPercent = function() {
      if (isScrollableElement(currentlySelectedElement)) {
        return scroll(0, currentlySelectedElement.scrollHeight * times(true) / 100 - currentlySelectedElement.scrollTop);
      } else {
        return scrollTo(window.scrollX, times(true) * $(document).height() / 100);
      }
    };

    desc(Scroll.toPercent, 'Scroll to {count}% of the page');

    return Scroll;

  })();

}).call(this);