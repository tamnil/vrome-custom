// Generated by CoffeeScript 1.10.0
(function() {
  window.Vrome = (function() {
    var disableMap;

    function Vrome() {}

    disableMap = {};

    Vrome.setStatus = function(tabId) {
      if (disableMap[tabId] != null) {
        chrome.browserAction.setIcon({
          path: 'images/logo-disable.png'
        });
        return chrome.browserAction.setTitle({
          title: 'Vrome (disabled)'
        });
      } else {
        chrome.browserAction.setIcon({
          path: 'images/logo.png'
        });
        return chrome.browserAction.setTitle({
          title: 'Vrome (enabled)'
        });
      }
    };

    Vrome.enable = function(msg) {
      delete disableMap[msg.tab.id];
      return Vrome.setStatus(msg.tab.id);
    };

    Vrome.disable = function(msg) {
      disableMap[msg.tab.id] = true;
      return Vrome.setStatus(msg.tab.id);
    };

    return Vrome;

  })();

}).call(this);
