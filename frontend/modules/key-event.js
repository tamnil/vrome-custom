// Generated by CoffeeScript 1.10.0
(function() {
  window.KeyEvent = (function() {
    var bindings, currentKeys, disableVrome, filterKey, ignoreKey, keyTimes, passNextKey, ref, runCurrentKeys, showStatusLine, storeLast;

    function KeyEvent() {}

    ref = [false, false, '', 0, {}], disableVrome = ref[0], passNextKey = ref[1], currentKeys = ref[2], keyTimes = ref[3], bindings = ref[4];

    KeyEvent.init = function() {
      var disabledSite, i, len, ref1;
      ref1 = Option.get('disablesites').split(',');
      for (i = 0, len = ref1.length; i < len; i++) {
        disabledSite = ref1[i];
        if (disabledSite !== '') {
          if (new RegExp(disabledSite.trim(), 'i').test(location.href)) {
            KeyEvent.disable();
          }
        }
      }
      return document.addEventListener('keydown', KeyEvent.exec, true);
    };

    KeyEvent.add = function(keys, func, insertMode) {
      if (bindings[keys] == null) {
        bindings[keys] = [null, null];
      }
      return bindings[keys][Number(insertMode)] = func;
    };

    KeyEvent.stopPropagation = function(e) {
      e.stopPropagation();
      return e.preventDefault();
    };

    KeyEvent.enable = function() {
      var ref1;
      ref1 = [false, false], disableVrome = ref1[0], passNextKey = ref1[1];
      Post({
        action: 'Vrome.enable'
      });
      return KeyEvent.reset();
    };

    KeyEvent.disable = function() {
      if (Option.get('show_disabled_text')) {
        CmdBox.set({
          title: ' -- PASS THROUGH -- ',
          mouseOverTitle: CmdBox.remove
        });
      }
      disableVrome = true;
      return Post({
        action: 'Vrome.disable'
      });
    };

    desc(KeyEvent.disable, 'Disable Vrome');

    KeyEvent.disable.options = {
      disablesites: {
        description: "Disable Vrome in those sites. Multiple URLs can be separated with ','",
        example: 'set disablesites=mail.google.com,reader.google.com'
      },
      enable_vrome_key: {
        description: 'Key to enable Vrome again',
        example: 'set enable_vrome_key=<Esc>'
      },
      show_disabled_text: {
        description: 'Show Vrome Disabled text or not. You could also know this from the Action Icon',
        example: 'set show_disable_text=0'
      }
    };

    KeyEvent.passNextKey = function() {
      if (Option.get('show_disabled_text')) {
        CmdBox.set({
          title: ' -- PASS THROUGH (next) -- ',
          timeout: 2000
        });
      }
      passNextKey = true;
      return Post({
        action: 'Vrome.disable'
      });
    };

    desc(KeyEvent.passNextKey, 'Pass next key');

    KeyEvent.reset = function() {
      currentKeys = '';
      return keyTimes = 0;
    };

    KeyEvent.times = function(onlyRead) {
      var result;
      result = keyTimes;
      if (!onlyRead) {
        keyTimes = 0;
      }
      return result;
    };

    storeLast = function() {
      return Settings.add({
        currentKeys: currentKeys,
        times: keyTimes
      });
    };

    KeyEvent.runLast = function() {
      return runCurrentKeys(Settings.get('@currentKeys'), Settings.get('@times'), false);
    };

    desc(KeyEvent.runLast, 'Repeat the last command');

    filterKey = function(key, insertMode) {
      var configure, mode, ref1;
      configure = Settings.get('@configure');
      mode = insertMode ? 'imap' : 'map';
      if (/^\d$/.test(key)) {
        return key;
      }
      return (configure != null ? (ref1 = configure[mode]) != null ? ref1[key] : void 0 : void 0) || key;
    };

    ignoreKey = function(key, insertMode) {
      var configure, mode, ref1;
      configure = Settings.get('@configure');
      mode = insertMode ? 'iunmap' : 'unmap';
      return (configure != null ? (ref1 = configure[mode]) != null ? ref1[key] : void 0 : void 0) != null;
    };

    showStatusLine = function() {
      if (Option.get('showstatus')) {
        return CmdBox.set({
          title: "" + (keyTimes || '') + currentKeys,
          timeout: 500
        });
      }
    };

    runCurrentKeys = function(keys, times, insertMode, e) {
      var bindingFunction, command, count, error, error1, key, match, modes, numberInsertMode, originalKeyTimes, ref1, someBindingMatched, startsWithKey, stopPropagation;
      if (!keys) {
        return;
      }
      key = e ? getKey(e) : null;
      stopPropagation = function() {
        if (e && !(isAcceptKey(key) && (insertMode || Hint.isHintable(document.activeElement)))) {
          return KeyEvent.stopPropagation(e);
        }
      };
      if ((keys === '0' && keyTimes === 0) || !/^\d$/.test(keys)) {
        /^(\d*)(.+)$/.test(keys);
        count = Number(RegExp.$1);
        match = RegExp.$2;
        bindingFunction = (ref1 = bindings[match]) != null ? ref1[Number(insertMode)] : void 0;
        if (bindingFunction != null) {
          originalKeyTimes = keyTimes;
          if (count > 1 || times > 1) {
            keyTimes = (keyTimes || 1) * times * (count || 1);
          }
          try {
            bindingFunction.call(e);
          } catch (error1) {
            error = error1;
            Debug(error);
          }
          keyTimes = originalKeyTimes;
          if (e) {
            if (key !== '.' && !insertMode) {
              storeLast();
            }
            stopPropagation();
            keyTimes = 0;
          }
          return currentKeys = '';
        } else {
          numberInsertMode = Number(insertMode);
          startsWithKey = function(command, key) {
            return command === key || (command.startsWith(key) && !command.startsWith('<'));
          };
          for (command in bindings) {
            modes = bindings[command];
            if (!((modes[numberInsertMode] != null) && startsWithKey(command, keys))) {
              continue;
            }
            someBindingMatched = true;
            stopPropagation();
            showStatusLine();
            break;
          }
          if (!someBindingMatched) {
            return currentKeys = '';
          }
        }
      } else if (!insertMode && /^\d$/.test(key)) {
        keyTimes = keyTimes * 10 + Number(key);
        currentKeys = '';
        return showStatusLine();
      }
    };

    KeyEvent.exec = function(e) {
      var insertMode, key;
      key = getKey(e);
      if (isModifierKey(key)) {
        return KeyEvent.stopPropagation(e);
      }
      insertMode = isEditableElement(e.target);
      if (!insertMode && (passNextKey || (disableVrome && isCtrlEscapeKey(key)))) {
        window.CancelKeyFunction();
        return KeyEvent.enable();
      }
      if (disableVrome) {
        return;
      }
      currentKeys = filterKey(currentKeys.concat(key), insertMode);
      if (ignoreKey(currentKeys, insertMode)) {
        return;
      }
      return runCurrentKeys(currentKeys, 1, insertMode, e);
    };

    return KeyEvent;

  })();

}).call(this);
