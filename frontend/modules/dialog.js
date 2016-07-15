// Generated by CoffeeScript 1.10.0
(function() {
  var modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

  window.Dialog = (function() {
    var NOTICE_ID, QUICK_NUM, SEARCH_RESULT, SELECTED_CLASS, VROME_DIALOG, buildResult, callSearchFunc, dialogBox, dialogMode, handleInput, i, j, key, len, newTab, next, notice, prev, ref, ref1, ref2, searchFunc, searching, selected, setResultBox, setSelected, specialKeys, tabFunc;

    function Dialog() {}

    ref = [], dialogMode = ref[0], searchFunc = ref[1], tabFunc = ref[2], newTab = ref[3], searching = ref[4], selected = ref[5];

    ref1 = ['__vrome_search_result', '__vrome_selected', '__vrome_quick_num', '__vrome_dialog_notice', '__vrome_dialog'], SEARCH_RESULT = ref1[0], SELECTED_CLASS = ref1[1], QUICK_NUM = ref1[2], NOTICE_ID = ref1[3], VROME_DIALOG = ref1[4];

    dialogBox = function() {
      var dialog;
      dialog = $("#" + VROME_DIALOG);
      if (dialog.length === 0) {
        dialog = $('<div>', {
          id: VROME_DIALOG,
          style: "bottom: " + (CmdBox.cmdBox().outerHeight()) + "px"
        });
        $(document.documentElement).prepend(dialog);
      }
      return dialog;
    };

    setResultBox = function(results, append) {
      var i, len, result;
      if (append == null) {
        append = false;
      }
      if (!append) {
        $("." + SEARCH_RESULT).remove();
      }
      for (i = 0, len = results.length; i < len; i++) {
        result = results[i];
        if ($.isArray(result)) {
          setResultBox(result, true);
        } else {
          dialogBox().append($('<div>', {
            "class": SEARCH_RESULT
          }).append(result));
        }
      }
      return setSelected(0);
    };

    setSelected = function(num) {
      var i, index, j, maxNum, ref2, ref3, ref4, ref5, results;
      if (num == null) {
        num = 0;
      }
      ref2 = [num, $("." + SEARCH_RESULT)], selected = ref2[0], results = ref2[1];
      $("." + SELECTED_CLASS).removeClass(SELECTED_CLASS);
      notice($(results[selected]).addClass(SELECTED_CLASS).find('a').trigger('onselect').attr('href'));
      $("." + QUICK_NUM).remove();
      maxNum = Math.min(9, results.length - 1);
      for (index = i = 0, ref3 = maxNum; 0 <= ref3 ? i <= ref3 : i >= ref3; index = 0 <= ref3 ? ++i : --i) {
        $(results[modulo(selected + index, results.length)]).prepend($('<span>', {
          "class": QUICK_NUM
        }).text(index));
      }
      for (index = j = ref4 = maxNum; ref4 <= 0 ? j <= 0 : j >= 0; index = ref4 <= 0 ? ++j : --j) {
        if ((ref5 = $("." + QUICK_NUM + ":contains(" + index + ")").get(0)) != null) {
          ref5.scrollIntoViewIfNeeded();
        }
      }
    };

    notice = function(msg) {
      var cmdBox, noticeElement, style;
      cmdBox = $(CmdBox.cmdBox());
      noticeElement = $("#" + NOTICE_ID);
      if (noticeElement.length === 0) {
        style = ("right: " + (cmdBox.outerWidth()) + "px; ") + ("height:" + (cmdBox.outerHeight()) + "px; ") + ("line-height:" + (cmdBox.outerHeight()) + "px; ") + ("width: " + (dialogBox().outerWidth() - cmdBox.outerWidth() - 12) + "px");
        noticeElement = $('<div>', {
          id: NOTICE_ID,
          style: style
        });
        $(document.documentElement).prepend(noticeElement);
      }
      return noticeElement.text(msg);
    };

    buildResult = function(s, href) {
      var description, onClick, ref2, title;
      onClick = function(e) {
        var ref2;
        KeyEvent.stopPropagation(e);
        if (!((ref2 = s.onClick) != null ? ref2.call('', e) : void 0)) {
          return Post({
            action: 'Tab.openUrl',
            url: href,
            newTab: e.ctrlKey
          });
        }
      };
      title = s.title ? s.title + " -- " : '';
      description = "" + title + ((ref2 = s.description) != null ? ref2 : s.url);
      return $('<a>', {
        href: href != null ? href : '#',
        title: s.title,
        text: description,
        click: onClick
      }).bind('onselect', s.onSelect);
    };

    Dialog.start = function(o) {
      var ref2, ref3;
      ref2 = [true, o.newTab, o.search, o.onTab], dialogMode = ref2[0], newTab = ref2[1], searchFunc = ref2[2], tabFunc = ref2[3];
      CmdBox.set({
        title: o.title,
        pressDown: handleInput,
        pressUp: o.pressUp,
        content: (ref3 = o.content) != null ? ref3 : ''
      });
      return callSearchFunc();
    };

    Dialog.stop = function(force) {
      var box, i, len, ref2;
      if (!(dialogMode || force)) {
        return;
      }
      ref2 = [dialogBox(), $("#" + NOTICE_ID), CmdBox];
      for (i = 0, len = ref2.length; i < len; i++) {
        box = ref2[i];
        box.remove();
      }
      return dialogMode = false;
    };

    Dialog.draw = function(msg) {
      var results, source, sources, url;
      if (!dialogMode) {
        return;
      }
      sources = msg.urls || msg.sources;
      searching = false;
      results = (function() {
        var i, len, results1;
        if (msg.searching) {
          searching = true;
          return [$('<div>').html('Searching...')];
        } else if (sources.length === 0) {
          return [$('<div>').html('No results found!')];
        } else {
          results1 = [];
          for (i = 0, len = sources.length; i < len; i++) {
            source = sources[i];
            if ($.isArray(source.url)) {
              results1.push((function() {
                var j, len1, ref2, results2;
                ref2 = source.url;
                results2 = [];
                for (j = 0, len1 = ref2.length; j < len1; j++) {
                  url = ref2[j];
                  results2.push(buildResult(source, url));
                }
                return results2;
              })());
            } else {
              results1.push(buildResult(source, source.url));
            }
          }
          return results1;
        }
      })();
      return setResultBox(results);
    };

    next = function(direction) {
      if (direction == null) {
        direction = 1;
      }
      return setSelected(modulo(selected + direction, $("." + SEARCH_RESULT).length));
    };

    prev = function(direction) {
      if (direction == null) {
        direction = 1;
      }
      return next(-direction);
    };

    specialKeys = {};

    ref2 = ['<Up>', '<S-Tab>', '<Down>', '<Tab>', 'Control'];
    for (i = 0, len = ref2.length; i < len; i++) {
      key = ref2[i];
      specialKeys[key] = null;
    }

    for (key = j = 0; j <= 9; key = ++j) {
      specialKeys["<C-" + key + ">"] = null;
      specialKeys["<M-" + key + ">"] = null;
    }

    handleInput = function(e) {
      key = getKey(e);
      if (key === '<Tab>') {
        return tabFunc != null ? tabFunc.call('', e) : void 0;
      } else if (key in specialKeys) {
        if (key.match(/<(?:C|M)-(\d)>/)) {
          next(Number(RegExp.$1));
          Dialog.openCurrent();
        }
        if (key === Option.get('autocomplete_prev')) {
          prev();
        }
        if (key === Option.get('autocomplete_next')) {
          next();
        }
        if (key === Option.get('autocomplete_prev_10')) {
          prev(10);
        }
        if (key === Option.get('autocomplete_next_10')) {
          return next(10);
        }
      } else if (!isEscapeKey(key)) {
        clearTimeout(Dialog.timeout);
        Dialog.timeout = setTimeout(callSearchFunc, 200);
        return Dialog.draw({
          searching: true
        });
      }
    };

    callSearchFunc = function() {
      return searchFunc(CmdBox.get().content);
    };

    Dialog.openCurrentNewTab = function() {
      return Dialog.openCurrent(true);
    };

    Dialog.openCurrentNewTab.description = 'Open selected URL in a new tab';

    Dialog.current = function() {
      return $("." + SELECTED_CLASS + " a");
    };

    Dialog.openCurrent = function(keepOpen) {
      if (searching) {
        return setTimeout(Dialog.openCurrent, 100, keepOpen);
      }
      if (!dialogMode) {
        return;
      }
      clickElement(Dialog.current(), {
        ctrl: keepOpen || newTab
      });
      if (!keepOpen) {
        return Dialog.stop();
      }
    };

    return Dialog;

  })();

}).call(this);
