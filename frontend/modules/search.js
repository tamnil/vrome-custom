// Generated by CoffeeScript 1.10.0
(function() {
  var modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

  window.Search = (function() {
    var HIGHLIGHT_CLASS, HIGHLIGHT_CURRENT_ID, direction, doHighlight, find, handleInput, justClickedPosition, lastSearch, nodes, onNothingFound, originalX, originalY, ref, ref1, repeatSearch, searchMode, timeout, title;

    function Search() {}

    ref = [], searchMode = ref[0], direction = ref[1], lastSearch = ref[2], nodes = ref[3], originalX = ref[4], originalY = ref[5], justClickedPosition = ref[6], timeout = ref[7];

    ref1 = ['__vrome_search_highlight', '__vrome_search_highlight_current'], HIGHLIGHT_CLASS = ref1[0], HIGHLIGHT_CURRENT_ID = ref1[1];

    Search.backward = function() {
      return Search.start(-1);
    };

    desc(Search.backward, 'Start backward search (with selected text)');

    $(document.documentElement).click(function(e) {
      if (!searchMode) {
        return;
      }
      return justClickedPosition = {
        x: e.pageX,
        y: e.pageY
      };
    });

    title = function() {
      if (direction > 0) {
        return 'Forward search: /';
      } else {
        return 'Backward search: ?';
      }
    };

    Search.start = function(offset) {
      var ref2;
      if (offset == null) {
        offset = 1;
      }
      ref2 = [true, offset, window.scrollX, window.scrollY], searchMode = ref2[0], direction = ref2[1], originalX = ref2[2], originalY = ref2[3], justClickedPosition = ref2[4];
      return CmdBox.set({
        title: title(),
        pressUp: handleInput,
        content: getSelected() || (lastSearch != null ? lastSearch.text : void 0) || ''
      });
    };

    desc(Search.start, 'Start forward search (with selected text)');

    Search.stop = function() {
      if (!searchMode) {
        return;
      }
      clearTimeout(timeout);
      searchMode = false;
      if (CmdBox.isActive()) {
        scrollTo(originalX, originalY);
      }
      CmdBox.remove();
      return Search.removeHighlights();
    };

    Search.removeHighlights = function() {
      return $(document.documentElement).unhighlight({
        className: HIGHLIGHT_CLASS
      });
    };

    handleInput = function(e) {
      var key;
      if (!searchMode) {
        return;
      }
      key = getKey(e);
      if (!(key === 'Enter' || isModifierKey(key))) {
        Search.removeHighlights();
      }
      lastSearch = {
        text: CmdBox.get().content,
        position: 0,
        direction: direction
      };
      return find(false, lastSearch.text);
    };

    doHighlight = function(inFullPage, keyword) {
      $(document.documentElement).highlight(keyword, {
        className: HIGHLIGHT_CLASS,
        filterFunction: function(e) {
          return isElementVisible($(e), inFullPage);
        }
      });
      return nodes = $("." + HIGHLIGHT_CLASS).sort(function(a, b) {
        var offsetA, offsetB, topDifference;
        offsetA = $(a).offset();
        offsetB = $(b).offset();
        topDifference = offsetA.top - offsetB.top;
        if (topDifference !== 0) {
          return topDifference;
        }
        return offsetA.left - offsetB.left;
      });
    };

    find = function(inFullPage, keyword) {
      if (keyword === '') {
        return scrollTo(originalX, originalY);
      }
      clearTimeout(timeout);
      doHighlight(inFullPage, keyword);
      if (!inFullPage) {
        if (nodes.length === 0) {
          doHighlight(true, keyword);
        } else {
          timeout = setTimeout((function() {
            return doHighlight(true, keyword);
          }), 300);
        }
      }
      return Search.next(lastSearch.position);
    };

    Search.prev = function() {
      return Search.next(-1);
    };

    desc(Search.prev, 'Find previous');

    onNothingFound = function() {
      CmdBox.set({
        title: 'Nothing found'
      });
      return scrollTo(originalX, originalY);
    };

    repeatSearch = function(step) {
      if (!lastSearch || lastSearch.text === '') {
        return;
      }
      Search.start(lastSearch.direction);
      lastSearch.position += step;
      find(true, lastSearch.text);
      return InsertMode.blurFocus();
    };

    Search.next = function(step) {
      var cmdBoxTitle, currentIndex, currentNode, gotoIndex, index, nodeOffset, offset, ref2;
      if (step == null) {
        step = 1;
      }
      if (!searchMode) {
        return repeatSearch(step);
      }
      if (nodes.length === 0) {
        return onNothingFound();
      }
      offset = direction * step * times();
      currentNode = nodes.filter("#" + HIGHLIGHT_CURRENT_ID).removeAttr('id');
      currentIndex = Math.max(0, nodes.index(currentNode));
      if (justClickedPosition) {
        if (step > 0) {
          index = 0;
          while (index < nodes.length) {
            nodeOffset = $(nodes[index]).offset();
            if (nodeOffset.top > justClickedPosition.y || (nodeOffset.top === justClickedPosition.y && nodeOffset.left >= justClickedPosition.x)) {
              break;
            }
            index++;
          }
        } else {
          index = nodes.length - 1;
          while (index >= 0) {
            nodeOffset = $(nodes[index]).offset();
            if (nodeOffset.top < justClickedPosition.y || (nodeOffset.top === justClickedPosition.y && nodeOffset.left <= justClickedPosition.x)) {
              break;
            }
            index--;
          }
        }
        gotoIndex = index === nodes.length ? 0 : index;
        justClickedPosition = null;
      } else {
        gotoIndex = modulo(currentIndex + offset, nodes.length);
      }
      lastSearch.position = gotoIndex;
      if ((ref2 = $(nodes[gotoIndex]).attr('id', HIGHLIGHT_CURRENT_ID).get(0)) != null) {
        ref2.scrollIntoViewIfNeeded();
      }
      cmdBoxTitle = gotoIndex === currentIndex && step !== 0 ? 'No more results found' : offset > 0 && gotoIndex < currentIndex ? 'Search hit BOTTOM, continuing at TOP' : offset < 0 && gotoIndex > currentIndex ? 'Search hit TOP, continuing at BOTTOM' : title();
      return CmdBox.set({
        title: cmdBoxTitle
      });
    };

    desc(Search.next, 'Find next');

    Search.openCurrentNewTab = function() {
      return Search.openCurrent(true);
    };

    desc(Search.openCurrentNewTab, 'Open selected element in a new tab');

    Search.openCurrent = function(newTab) {
      if (!searchMode) {
        return;
      }
      clickElement($("#" + HIGHLIGHT_CURRENT_ID), {
        ctrl: newTab
      });
      return this.stop();
    };

    desc(Search.openCurrent, 'Open selected element in current tab');

    Search.onAcceptKeyPressed = function() {
      if (!searchMode) {
        return;
      }
      if (nodes.length === 0) {
        return Search.stop();
      }
      if (CmdBox.isActive()) {
        return InsertMode.blurFocus();
      } else {
        return Search.openCurrent(false);
      }
    };

    return Search;

  })();

}).call(this);
