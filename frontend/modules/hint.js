// Generated by CoffeeScript 1.10.0
(function() {
  window.Hint = (function() {
    var HINTABLE, copyElementText, copyElementUrl, currentKeys, delayToWaitKeyDown, elements, execCurrent, focusElement, freshHints, getCurrentAction, handleInput, hintKeyToNumber, hintKeys, hintMatch, hintMode, invertFilter, matched, multiMode, newTab, numberToHintKey, openUrlIncognito, ref, removeHighlightBox, selected, setCurrentKeys, setMatched, setSelected, showElementInfo, subActions, title;

    function Hint() {}

    ref = [], newTab = ref[0], multiMode = ref[1], hintMode = ref[2], elements = ref[3], matched = ref[4], selected = ref[5], currentKeys = ref[6];

    HINTABLE = 'a,textarea,select,button,area[href],input:not([type=hidden]),' + '*[onclick],*[onmouseover],[contenteditable],.js-new-tweets-bar,' + '[role=link],[role=checkbox],[role=button],[role=tab],[role=menubar]';

    Hint.isHintable = function(elem) {
      return $(elem).parent().find(HINTABLE).toArray().indexOf(elem) !== -1;
    };

    title = function() {
      var mode, ref1, subAction;
      mode = multiMode ? ['multi mode'] : (newTab ? ['new tab'] : []);
      if (subAction = (ref1 = getCurrentAction()) != null ? ref1.hint : void 0) {
        mode.push(subAction);
      }
      return "Hint " + (mode.length > 0 ? "{" + (mode.join(',')) + "}" : '');
    };

    removeHighlightBox = function(createAfterRemove) {
      $('#__vim_hint_highlight').remove();
      if (createAfterRemove) {
        $(document.documentElement).append($('<div>', {
          id: '__vim_hint_highlight'
        }));
      }
      return $('#__vim_hint_highlight');
    };

    freshHints = function() {
      var className, elem, highlightBox, hintKey, i, index, len, offset, ref1, span;
      highlightBox = removeHighlightBox(true);
      ref1 = matched != null ? matched : [];
      for (index = i = 0, len = ref1.length; i < len; index = ++i) {
        elem = ref1[index];
        hintKey = numberToHintKey(index + 1);
        className = 'normal';
        if (hintKey === (currentKeys || numberToHintKey(1))) {
          className = 'active';
        }
        if (!hintKey.startsWith(currentKeys)) {
          className = 'hidden';
        }
        if (currentKeys) {
          hintKey = $('<key>', {
            text: currentKeys
          }).get(0).outerHTML + hintKey.trimFirst(currentKeys);
        }
        span = $('<span>', {
          vrome_highlight: className,
          html: hintKey
        });
        $(highlightBox).append(span);
        offset = $(elem).offset();
        span.offset({
          left: offset.left - 6,
          top: offset.top
        });
      }
    };

    setMatched = function(_matched) {
      matched = _matched;
      return freshHints();
    };

    setSelected = function(_selected) {
      selected = _selected;
      freshHints();
      CmdBox.set({
        title: selected > 0 ? (title()) + " (" + (numberToHintKey(selected)) + ")" : title()
      });
      if (selected * hintKeys().length > matched.length) {
        return setTimeout(execCurrent, 200);
      }
    };

    setCurrentKeys = function(_currentKeys) {
      currentKeys = _currentKeys;
      return setSelected(hintKeyToNumber(currentKeys));
    };

    hintKeys = function() {
      if (Option.get('useletters') === 1) {
        return Option.get('hintkeys');
      } else {
        return '0123456789';
      }
    };

    numberToHintKey = function(number) {
      var hints, key, ref1;
      ref1 = ['', hintKeys()], key = ref1[0], hints = ref1[1];
      while (number !== 0) {
        key = hints[number % hints.length] + key;
        number = parseInt(number / hints.length, 10);
      }
      return key;
    };

    hintKeyToNumber = function(keys) {
      var hints, number, ref1;
      ref1 = [0, hintKeys()], number = ref1[0], hints = ref1[1];
      while (keys !== '') {
        number = (number * hints.length) + hints.indexOf(keys[0]);
        keys = keys.slice(1);
      }
      return number;
    };

    Hint.multiModeStart = function() {
      return Hint.start(true, true);
    };

    desc(Hint.multiModeStart, 'Same as `f`, but could open multiple links');

    Hint.newTabStart = function() {
      return Hint.start(true, false);
    };

    desc(Hint.newTabStart, 'Same as `f`, but open in a new tab');

    Hint.start = function(new_tab, multi_mode) {
      var e, ref1;
      ref1 = [true, new_tab, multi_mode], hintMode = ref1[0], newTab = ref1[1], multiMode = ref1[2];
      setMatched(elements = (function() {
        var i, len, ref2, results;
        ref2 = $(HINTABLE).not("#" + CmdBox.INPUT_BOX_ID);
        results = [];
        for (i = 0, len = ref2.length; i < len; i++) {
          e = ref2[i];
          if (isElementVisible($(e))) {
            results.push(e);
          }
        }
        return results;
      })());
      setCurrentKeys('');
      return CmdBox.set({
        title: title(),
        pressDown: handleInput,
        content: ''
      });
    };

    desc(Hint.start, 'Start Hint mode');

    Hint.start.options = {
      hintkeys: {
        description: 'Keys used to generate hints',
        example: 'set hintkeys=jlkhfsdagwerui'
      },
      useletters: {
        description: 'Use letters or numbers to generate hints; if equal 0, then hintkeys will be ignored',
        example: 'set useletters=1'
      }
    };

    Hint.remove = function() {
      if (!hintMode) {
        return;
      }
      CmdBox.remove();
      removeHighlightBox(false);
      return hintMode = false;
    };

    handleInput = function(e) {
      var currentKey;
      currentKey = getKey(e);
      if (hintKeys().indexOf(currentKey) !== -1 || (currentKey === '<BackSpace>' && selected !== 0)) {
        setCurrentKeys(currentKey === '<BackSpace>' ? currentKeys.slice(0, -1) : "" + currentKeys + currentKey);
        return KeyEvent.stopPropagation(e);
      } else {
        if (!isEscapeKey(currentKey)) {
          return setTimeout(delayToWaitKeyDown, 20, currentKey);
        }
      }
    };

    delayToWaitKeyDown = function(currentKey) {
      setMatched(elements.filter(hintMatch));
      if (isCtrlAcceptKey(currentKey)) {
        return execCurrent(matched);
      } else if (isAcceptKey(currentKey) || matched.length === 1) {
        return execCurrent();
      } else {
        return CmdBox.set({
          title: title()
        });
      }
    };

    hintMatch = function(elem) {
      var filter, match, regexp, text;
      filter = CmdBox.get().content;
      while (filter[0] in subActions) {
        filter = filter.slice(1);
      }
      regexp = new RegExp(filter, 'im');
      text = $(elem).val() || $(elem).text() || $(elem).attr('placeholder') || $(elem).attr('alt');
      match = regexp.test(text) || regexp.test(PinYin.shortcut(text)) || regexp.test(PinYin.full(text));
      if (getCurrentAction() === invertFilter && filter !== '') {
        return !match;
      } else {
        return match;
      }
    };

    getCurrentAction = function() {
      var actionName;
      actionName = CmdBox.get().content[0];
      return subActions[actionName];
    };

    showElementInfo = function(elem) {
      return CmdBox.set({
        title: elem.outerHTML.escape()
      });
    };

    showElementInfo.hint = 'show info';

    focusElement = function(elem) {
      return elem.focus();
    };

    focusElement.hint = 'focus';

    copyElementUrl = function(elem) {
      var text;
      text = fixRelativePath($(elem).attr('href'));
      Clipboard.copy(text);
      return CmdBox.set({
        title: "[Copied] " + text,
        timeout: 4000
      });
    };

    copyElementUrl.hint = 'copy url';

    copyElementText = function(elem) {
      var text;
      text = $(elem).val() || $(elem).text();
      Clipboard.copy(text);
      return CmdBox.set({
        title: "[Copied] " + text,
        timeout: 4000
      });
    };

    copyElementText.hint = 'copy text';

    openUrlIncognito = function(elem) {
      return Post({
        action: 'Tab.openUrl',
        url: $(elem).attr('href'),
        incognito: true
      });
    };

    openUrlIncognito.hint = 'incognito';

    invertFilter = {};

    invertFilter.hint = 'invert';

    subActions = {
      ';': focusElement,
      '?': showElementInfo,
      '[': copyElementUrl,
      '{': copyElementText,
      '\\': openUrlIncognito,
      '!': invertFilter
    };

    execCurrent = function(elems) {
      var $elem, currentAction, elem, error, i, len, ref1;
      if (elems == null) {
        elems = null;
      }
      CmdBox.set({
        content: ''
      });
      if (elems == null) {
        elems = [matched[Math.max(0, selected - 1)]];
      }
      for (i = 0, len = elems.length; i < len; i++) {
        elem = elems[i];
        currentAction = getCurrentAction();
        $elem = $(elem);
        if ($.isFunction(currentAction)) {
          Hint.remove();
          currentAction(elem);
        } else {
          if ($elem.is('a')) {
            clickElement(elem, {
              ctrl: newTab
            });
          } else if ($elem.attr('onclick')) {
            clickElement(elem);
          } else if ($elem.attr('onmouseover')) {
            $elem.mouseover();
          } else if (($elem.is('input') && ((ref1 = elem.type) === 'submit' || ref1 === 'button' || ref1 === 'reset' || ref1 === 'radio' || ref1 === 'checkbox')) || $elem.is('button')) {
            clickElement(elem);
          } else if ($elem.is('input, textarea')) {
            try {
              $elem.select();
            } catch (error) {
              clickElement(elem);
            }
          } else if ($elem.is('select')) {
            $elem.focus();
          } else {
            clickElement(elem);
          }
          newTab = true;
        }
      }
      if (multiMode) {
        setCurrentKeys('');
        return CmdBox.set({
          title: title()
        });
      } else {
        return setTimeout(Hint.remove, 200);
      }
    };

    return Hint;

  })();

}).call(this);
