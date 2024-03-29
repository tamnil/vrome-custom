// Generated by CoffeeScript 1.10.0
(function() {
  window.Command = (function() {
    function Command() {}

    Command.source = function(msg) {
      var i, len, ref, src;
      ref = msg.sources.split(',');
      for (i = 0, len = ref.length; i < len; i++) {
        src = ref[i];
        src = src.trim();
        if (src.startsWith('@')) {
          src = Option.get('sources_map')[src.slice(1)];
        }
        src = src.getValidURL();
        if (src.startsWith('http')) {
          msg.code = src.endsWith('js') ? "var script = document.createElement('script'); script.setAttribute('src', '" + src + "'); document.body.appendChild(script);" : src.endsWith('css') ? "var script = document.createElement('link'); script.setAttribute('href', '" + src + "'); script.setAttribute('rel', 'stylesheet'); document.body.appendChild(script);" : void 0;
          runScript(msg);
        }
      }
    };

    return Command;

  })();

}).call(this);
