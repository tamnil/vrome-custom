// Generated by CoffeeScript 1.10.0
(function() {
  window.Clipboard = (function() {
    function Clipboard() {}

    Clipboard.copy = function(value) {
      return Post({
        action: 'Clipboard.copy',
        value: value
      });
    };

    return Clipboard;

  })();

}).call(this);
