// Generated by CoffeeScript 1.10.0
(function() {
  window.Debug = function(str) {
    var error, error1, params;
    if ($.isPlainObject(str) && str.message) {
      str = str.message;
    }
    if (typeof str === 'object' && str.hasOwnProperty('message')) {
      if (str.hasOwnProperty('stack')) {
        str = str.message + "\n" + str.stack;
      } else if (str.hasOwnProperty('lineno')) {
        str = str.message + "\n" + str.filename + ":" + str.lineno;
      }
    }
    if ($.isFunction(str)) {
      str = str.toString();
    }
    params = JSON.stringify({
      method: 'print_messages',
      messages: str
    });
    $.post(getLocalServerUrl(), params);
    try {
      if (Tab.currentTab) {
        return runScript({
          tab: Tab.currentTab,
          code: "console.log(\"" + (str.replace(/\"/g, '\\"')) + "\")"
        });
      }
    } catch (error1) {
      error = error1;
      return console.log(error);
    }
  };

}).call(this);
