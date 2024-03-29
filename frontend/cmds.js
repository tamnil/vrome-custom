// Generated by CoffeeScript 1.10.0
(function() {
  var AcceptKey, CancelKey, CtrlAcceptKey, CtrlEscapeKey, cmapFunc, extractFunction, i, imapFunc, jumpKeys, len, mapFunc, markKeys, nmapFunc, num, ref, url,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  AcceptKey = ['<Enter>', '<C-j>', '<C-m>'];

  CancelKey = ['<Esc>', '<C-[>'];

  CtrlAcceptKey = ['<C-Enter>'];

  CtrlEscapeKey = ['<C-Esc>'];

  window.isModifierKey = function(key) {
    return key === 'Control' || key === 'Shift' || key === 'Alt' || key === 'Win' || key === 'Meta';
  };

  window.isCtrlAcceptKey = function(key) {
    return indexOf.call(CtrlAcceptKey, key) >= 0;
  };

  window.isAcceptKey = function(key) {
    return indexOf.call(AcceptKey, key) >= 0;
  };

  window.isEscapeKey = function(key) {
    return indexOf.call(CancelKey, key) >= 0;
  };

  window.isCtrlEscapeKey = function(key) {
    if (Option.get('enable_vrome_key') === key) {
      return true;
    }
    return indexOf.call(CtrlEscapeKey, key) >= 0;
  };

  window.AcceptKeyFunction = function() {
    Search.onAcceptKeyPressed();
    Dialog.openCurrent();
    Buffer.gotoFirstMatchHandle();
    Buffer.deleteMatchHandle();
    return Buffer.deleteNoteMatchHandle();
  };

  window.CancelKeyFunction = function() {
    Hint.remove();
    Search.stop();
    Dialog.stop(true);
    Buffer.reset();
    InsertMode.blurFocus();
    KeyEvent.reset();
    CmdBox.remove();
    return Help.hide(true);
  };

  desc(window.CancelKeyFunction, 'Cancel Actions');

  window.CtrlAcceptKeyFunction = function() {
    Dialog.openCurrentNewTab();
    return Search.openCurrentNewTab();
  };

  extractFunction = function(functionName) {
    var action, func, i, len, ref;
    ref = functionName.split('.');
    for (i = 0, len = ref.length; i < len; i++) {
      action = ref[i];
      func = (func != null ? func : window)[action];
    }
    return func;
  };

  imapFunc = function(key, func, virtualKey) {
    var extractedFunc, i, k, keys, len;
    keys = $.isArray(key) ? key : [key];
    extractedFunc = extractFunction(func);
    for (i = 0, len = keys.length; i < len; i++) {
      k = keys[i];
      KeyEvent.add(k, extractedFunc, true);
    }
    return Help.add(virtualKey != null ? virtualKey : key, func, extractedFunc, 'i');
  };

  nmapFunc = function(key, func, virtualKey) {
    var extractedFunc, i, k, keys, len;
    keys = $.isArray(key) ? key : [key];
    extractedFunc = extractFunction(func);
    for (i = 0, len = keys.length; i < len; i++) {
      k = keys[i];
      KeyEvent.add(k, extractedFunc, false);
    }
    return Help.add(virtualKey != null ? virtualKey : key, func, extractedFunc, 'n');
  };

  cmapFunc = function(key, func, virtualKey) {
    var extractedFunc, i, k, keys, len;
    keys = $.isArray(key) ? key : [key];
    extractedFunc = extractFunction(func);
    for (i = 0, len = keys.length; i < len; i++) {
      k = keys[i];
      CmdLine.add(k, extractedFunc);
    }
    return Help.add(virtualKey != null ? virtualKey : key, func, extractedFunc, 'c');
  };

  mapFunc = function(key, func, virtualKey) {
    nmapFunc(key, func, virtualKey);
    return imapFunc(key, func, virtualKey);
  };

  nmapFunc('<F1>', 'Help.show');

  nmapFunc(':', 'CmdLine.start');

  mapFunc(AcceptKey, 'AcceptKeyFunction');

  mapFunc(CancelKey, 'CancelKeyFunction');

  mapFunc(CtrlAcceptKey, 'CtrlAcceptKeyFunction');

  nmapFunc('<C-z>', 'KeyEvent.disable');

  nmapFunc('<C-v>', 'KeyEvent.passNextKey');

  nmapFunc('.', 'KeyEvent.runLast');

  nmapFunc('zi', 'Zoom.current_in');

  nmapFunc('zo', 'Zoom.current_out');

  nmapFunc('zm', 'Zoom.current_more');

  nmapFunc('zr', 'Zoom.current_reduce');

  nmapFunc('zz', 'Zoom.current_reset');

  nmapFunc('zI', 'Zoom.zoomIn');

  nmapFunc('zO', 'Zoom.out');

  nmapFunc('zM', 'Zoom.more');

  nmapFunc('zR', 'Zoom.reduce');

  nmapFunc('zZ', 'Zoom.reset');

  nmapFunc('gg', 'Scroll.top');

  nmapFunc('G', 'Scroll.bottom');

  nmapFunc('0', 'Scroll.first');

  nmapFunc('$', 'Scroll.last');

  nmapFunc('%', 'Scroll.toPercent');

  nmapFunc('k', 'Scroll.up');

  nmapFunc('j', 'Scroll.down');

  nmapFunc('h', 'Scroll.left');

  nmapFunc('l', 'Scroll.right');

  nmapFunc('<C-f>', 'Scroll.nextPage');

  nmapFunc('<C-b>', 'Scroll.prevPage');

  nmapFunc('<C-d>', 'Scroll.nextHalfPage');

  nmapFunc('<C-u>', 'Scroll.prevHalfPage');

  nmapFunc('gi', 'InsertMode.focusFirstTextInput');

  nmapFunc(']]', 'Page.next');

  nmapFunc('[[', 'Page.prev');

  nmapFunc('Y', 'Page.copySelected');

  nmapFunc('<C-g>', 'Page.showInfo');

  nmapFunc(']f', 'Frame.next');

  nmapFunc('[f', 'Frame.prev');

  nmapFunc('gf', 'Url.viewSource');

  nmapFunc('gF', 'Url.viewSourceNewTab');

  nmapFunc('y', 'Tab.copyUrl');

  nmapFunc('p', 'Url.openFromClipboard');

  nmapFunc('P', 'Url.openFromClipboardNewTab');

  nmapFunc('<M-p>', 'Url.openFromClipboardAndFocusNewTab');

  nmapFunc('<C-a>', 'Url.increment');

  nmapFunc('<C-x>', 'Url.decrement');

  nmapFunc('gu', 'Url.parent');

  nmapFunc('gU', 'Url.root');

  nmapFunc('gr', 'Url.referer');

  nmapFunc('gR', 'Url.tabReferer');

  nmapFunc('o', 'Url.open');

  nmapFunc('O', 'Url.openWithDefault');

  nmapFunc('t', 'Url.tabopen');

  nmapFunc('T', 'Url.tabopenWithDefault');

  nmapFunc('<C-y>', 'Url.shortUrl');

  nmapFunc('r', 'Tab.reload');

  nmapFunc('<C-r>', 'Tab.reloadWithoutCache');

  nmapFunc('R', 'Tab.reloadAll');

  nmapFunc(['<C-p>', 'gT'], 'Tab.prev');

  nmapFunc(['<C-n>', 'gt'], 'Tab.next');

  nmapFunc('gq', 'Tab.moveLeft');

  nmapFunc('ge', 'Tab.moveRight');

  nmapFunc('b', 'Buffer.gotoFirstMatch');

  nmapFunc(['dm', 'B'], 'Buffer.deleteMatch');

  nmapFunc('<M-b>', 'Buffer.deleteNotMatch');

  nmapFunc(['g0', 'g^'], 'Tab.first');

  nmapFunc('g$', 'Tab.last');

  nmapFunc('gl', 'Tab.selectLastOpen');

  nmapFunc(['<C-6>', '<C-^>'], 'Tab.selectPrevious');

  nmapFunc('dc', 'Tab.close');

  nmapFunc('D', 'Tab.closeAndFoucsLeft');

  nmapFunc('<M-d>', 'Tab.closeAndFoucsLast');

  nmapFunc('do', 'Tab.closeOtherTabs');

  nmapFunc('dl', 'Tab.closeLeftTabs');

  nmapFunc('dr', 'Tab.closeRightTabs');

  nmapFunc('u', 'Tab.reopen');

  nmapFunc('gd', 'Tab.duplicate');

  nmapFunc('gD', 'Tab.detach');

  nmapFunc('dp', 'Tab.closeUnPinnedTabs');

  nmapFunc('dP', 'Tab.closePinnedTabs');

  nmapFunc('gp', 'Tab.togglePin');

  nmapFunc('gP', 'Tab.unpinAllTabsInCurrentWindow');

  nmapFunc('gwP', 'Tab.unpinAllTabsInAllWindows');

  nmapFunc('gI', 'Tab.toggleIncognito');

  nmapFunc('gm', 'Tab.markForMerging');

  nmapFunc('gM', 'Tab.markAllForMerging');

  nmapFunc('gv', 'Tab.mergeMarkedTabs');

  nmapFunc(['H', '<C-o>'], 'History.back');

  nmapFunc(['L', '<C-i>'], 'History.forward');

  nmapFunc('gh', 'History.start');

  nmapFunc('gH', 'History.newTabStart');

  nmapFunc('gb', 'Bookmark.start');

  nmapFunc('gB', 'Bookmark.newTabStart');

  nmapFunc('f', 'Hint.start');

  nmapFunc('F', 'Hint.newTabStart');

  nmapFunc('<M-f>', 'Hint.multiModeStart');

  nmapFunc(['/', '*'], 'Search.start');

  nmapFunc(['?', '#'], 'Search.backward');

  nmapFunc('n', 'Search.next');

  nmapFunc('N', 'Search.prev');

  imapFunc('<M-Enter>', 'Search.next');

  imapFunc('<S-Enter>', 'Search.prev');

  markKeys = (function() {
    var i, results;
    results = [];
    for (num = i = 65; i <= 122; num = ++i) {
      if (indexOf.call([91, 92, 93, 94, 95, 96], num) < 0) {
        results.push('m' + String.fromCharCode(num));
      }
    }
    return results;
  })();

  nmapFunc(markKeys, 'Marks.addLocalMark', 'm[a-z][0-9]');

  jumpKeys = (function() {
    var i, results;
    results = [];
    for (num = i = 65; i <= 122; num = ++i) {
      if (indexOf.call([91, 92, 93, 94, 95, 96], num) < 0) {
        results.push("'" + String.fromCharCode(num));
      }
    }
    return results;
  })();

  nmapFunc(jumpKeys, 'Marks.addLocalMark', "'[a-z][0-9]");

  nmapFunc('M', 'Marks.addQuickMark');

  nmapFunc('go', 'Marks.gotoQuickMark');

  nmapFunc('gn', 'Marks.gotoQuickMarkNewTab');

  imapFunc('<C-i>', 'InsertMode.externalEditor');

  imapFunc('<C-u>', 'InsertMode.deleteToBeginCurrentLine');

  imapFunc('<C-k>', 'InsertMode.deleteToEndCurrentLine');

  imapFunc('<C-a>', 'InsertMode.moveToFirstOrSelectAll');

  imapFunc('<C-e>', 'InsertMode.moveToEnd');

  imapFunc('<M-a>', 'InsertMode.moveToBeginCurrentLine');

  imapFunc('<M-e>', 'InsertMode.moveToEndCurrentLine');

  imapFunc(['<M-y>', '<M-w>'], 'InsertMode.deleteBackwardWord');

  imapFunc('<M-o>', 'InsertMode.deleteForwardWord');

  imapFunc('<M-u>', 'InsertMode.deleteBackwardChar');

  imapFunc('<M-i>', 'InsertMode.deleteForwardChar');

  imapFunc('<M-h>', 'InsertMode.moveBackwardWord');

  imapFunc('<M-l>', 'InsertMode.moveForwardWord');

  imapFunc('<M-j>', 'InsertMode.moveBackwardChar');

  imapFunc('<M-k>', 'InsertMode.moveForwardChar');

  imapFunc('<M-n>', 'InsertMode.moveForwardLine');

  imapFunc('<M-m>', 'InsertMode.moveBackwardLine');

  imapFunc('<M-z>', 'InsertMode.restoreLastValue');

  cmapFunc('help', 'Help.show');

  cmapFunc('buffer_delete_matched', 'Buffer.deleteMatchHandle');

  cmapFunc('buffer_keep_matched', 'Buffer.deleteNoteMatchHandle');

  cmapFunc('make_links', 'AutoLink.makeLink');

  cmapFunc('images_toggle', 'Command.imagesToggle');

  cmapFunc('images_only', 'Command.imagesOnly');

  cmapFunc('javascript', 'Command.javascript');

  cmapFunc('css', 'Command.css');

  cmapFunc('source', 'Command.source');

  cmapFunc('reload_extension', 'Command.reloadExtension');

  cmapFunc('print', 'Command.print');

  cmapFunc('capture', 'Window.capture');

  cmapFunc('save_as', 'Window.saveAs');

  cmapFunc('quit', 'Tab.close');

  cmapFunc('window_open', 'Window.create');

  cmapFunc('window_only', 'Window.only');

  cmapFunc('window_close', 'Window.close');

  cmapFunc('window_closeall', 'Window.closeAll');

  ref = ['downloads', 'bookmarks', 'history', 'chrome_help', 'settings', 'extensions', 'github', 'issues', 'options'];
  for (i = 0, len = ref.length; i < len; i++) {
    url = ref[i];
    cmapFunc(["open_" + url + "!", "open_" + url], "Links." + url);
  }

}).call(this);
