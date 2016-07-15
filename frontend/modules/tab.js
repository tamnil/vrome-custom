// Generated by CoffeeScript 1.10.0
(function() {
  window.Tab = (function() {
    var move, unpinAll;

    function Tab() {}

    move = function(option) {
      if (option == null) {
        option = {};
      }
      return Post($.extend(option, {
        action: 'Tab.move'
      }));
    };

    unpinAll = function(option) {
      if (option == null) {
        option = {};
      }
      return Post($.extend(option, {
        action: 'Tab.unpinAll'
      }));
    };

    Tab.copyUrl = function() {
      var url;
      url = document.location.href;
      Clipboard.copy(url);
      return CmdBox.set({
        title: "[Copied] " + url,
        timeout: 4000
      });
    };

    desc(Tab.copyUrl, 'Copy current URL to clipboard');

    Tab.reopen = function() {
      return Post({
        action: 'Tab.reopen',
        count: times()
      });
    };

    desc(Tab.reopen, 'Reopen the last closed {count} tab');

    Tab.reload = function(option) {
      if (option == null) {
        option = {};
      }
      return Post($.extend(option, {
        action: 'Tab.reload'
      }));
    };

    desc(Tab.reload, 'Reload current tab');

    Tab.reloadWithoutCache = function() {
      return Tab.reload({
        bypassCache: true
      });
    };

    desc(Tab.reloadWithoutCache, 'Reload current tab (no cache)');

    Tab.reloadAll = function() {
      return Tab.reload({
        reloadAll: true
      });
    };

    desc(Tab.reloadAll, 'Reload all tabs');

    Tab.togglePin = function() {
      return Post({
        action: 'Tab.togglePin'
      });
    };

    desc(Tab.togglePin, 'Toggle current tab pin on/off');

    Tab.duplicate = function() {
      return Post({
        action: 'Tab.duplicate',
        count: times()
      });
    };

    desc(Tab.duplicate, 'Duplicate {count} current tab');

    Tab.detach = function() {
      return Post({
        action: 'Tab.detach'
      });
    };

    desc(Tab.detach, 'Detach current tab to a new window');

    Tab.toggleIncognito = function() {
      return Post({
        action: 'Tab.toggleIncognito'
      });
    };

    desc(Tab.toggleIncognito, 'Toggle incognito mode for current tab (Vrome should be enabled in incognito mode)');

    Tab.markForMerging = function(option) {
      if (option == null) {
        option = {};
      }
      return Post($.extend(option, {
        action: 'Tab.markForMerging'
      }));
    };

    desc(Tab.markForMerging, 'Mark/unmark current tab for merging (can mark multiple tabs)');

    Tab.markAllForMerging = function() {
      return Tab.markForMerging({
        all: true
      });
    };

    desc(Tab.markAllForMerging, 'Marks all tabs in current window for merging');

    Tab.mergeMarkedTabs = function() {
      return Post({
        action: 'Tab.mergeMarkedTabs'
      });
    };

    desc(Tab.mergeMarkedTabs, 'Merge marked tab(s) to current window');

    Tab.selectPrevious = function() {
      var count;
      if (count = times(true)) {
        return Post({
          action: 'Tab.select',
          index: count - 1
        });
      } else {
        return Post({
          action: 'Tab.selectPrevious'
        });
      }
    };

    desc(Tab.selectPrevious, 'Go to last selected or {count} tab');

    Tab.selectLastOpen = function() {
      return Post({
        action: 'Tab.selectLastOpen',
        count: times()
      });
    };

    desc(Tab.selectLastOpen, 'Go to last created tab');

    Tab.prev = function() {
      return Post({
        action: 'Tab.select',
        offset: -times()
      });
    };

    desc(Tab.prev, 'Go to left {count} tab');

    Tab.next = function() {
      return Post({
        action: 'Tab.select',
        offset: times()
      });
    };

    desc(Tab.next, 'Go to right {count} tab');

    Tab.first = function() {
      return Post({
        action: 'Tab.select',
        index: 0
      });
    };

    desc(Tab.first, 'Go to first tab');

    Tab.last = function() {
      return Post({
        action: 'Tab.select',
        index: -1
      });
    };

    desc(Tab.last, 'Go to last tab');

    Tab.close = function(option) {
      if (option == null) {
        option = {};
      }
      return Post($.extend(option, {
        action: 'Tab.close',
        count: times(true)
      }));
    };

    desc(Tab.close, 'Close current tab');

    Tab.closeAndFoucsLast = function() {
      return Tab.close({
        focusLast: true
      });
    };

    desc(Tab.closeAndFoucsLast, 'Close current tab and select last selected tab');

    Tab.closeAndFoucsLeft = function() {
      return Tab.close({
        offset: -1
      });
    };

    desc(Tab.closeAndFoucsLeft, 'Close current tab and select left tab');

    Tab.closeOtherTabs = function() {
      return Tab.close({
        type: 'closeOther'
      });
    };

    desc(Tab.closeOtherTabs, 'Close all tabs except current tab');

    Tab.closeLeftTabs = function() {
      return Tab.close({
        type: 'closeLeft'
      });
    };

    desc(Tab.closeLeftTabs, 'Close all or {count} tabs on the left');

    Tab.closeRightTabs = function() {
      return Tab.close({
        type: 'closeRight'
      });
    };

    desc(Tab.closeRightTabs, 'Close all or {count} tabs on the right');

    Tab.closePinnedTabs = function() {
      return Tab.close({
        type: 'closePinned'
      });
    };

    desc(Tab.closePinnedTabs, 'Close pinned tabs');

    Tab.closeUnPinnedTabs = function() {
      return Tab.close({
        type: 'closeUnPinned'
      });
    };

    desc(Tab.closeUnPinnedTabs, 'Close unpinned tabs');

    Tab.moveLeft = function() {
      return move({
        direction: 'left',
        count: times()
      });
    };

    desc(Tab.moveLeft, 'Move tab {count} left');

    Tab.moveRight = function() {
      return move({
        direction: 'right',
        count: times()
      });
    };

    desc(Tab.moveRight, 'Move tab {count} right');

    Tab.unpinAllTabsInCurrentWindow = unpinAll;

    desc(Tab.unpinAllTabsInCurrentWindow, 'Unpin all tabs in current window');

    Tab.unpinAllTabsInAllWindows = function() {
      return unpinAll({
        allWindows: true
      });
    };

    desc(Tab.unpinAllTabsInAllWindows, 'Unpin all tabs from all windows');

    return Tab;

  })();

}).call(this);