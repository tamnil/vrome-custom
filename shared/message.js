// Generated by CoffeeScript 1.10.0
(function() {
  chrome.runtime.onMessage.addListener(function(msg, sender) {
    var action, func, i, len, ref;
    ref = msg.action.split('.');
    for (i = 0, len = ref.length; i < len; i++) {
      action = ref[i];
      func = (func != null ? func : window)[action];
    }
    return typeof func === "function" ? func($.extend(msg, {
      tab: sender.tab
    })) : void 0;
  });

}).call(this);
