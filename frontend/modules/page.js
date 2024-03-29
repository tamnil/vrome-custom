// Generated by CoffeeScript 1.10.0
(function() {
  window.Page = (function() {
    var execMatch;

    function Page() {}

    execMatch = function(regexps) {
      var elem, elems, i, j, len, len1, ref, regexp, value;
      elems = (function() {
        var i, len, ref, results;
        ref = $('a, link').filter(function(_, e) {
          return isElementVisible($(e), true);
        }).reverse();
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          elem = ref[i];
          results.push([elem, $(elem).text().trim()]);
        }
        return results;
      })();
      for (i = 0, len = regexps.length; i < len; i++) {
        regexp = regexps[i];
        for (j = 0, len1 = elems.length; j < len1; j++) {
          ref = elems[j], elem = ref[0], value = ref[1];
          if (new RegExp(regexp, 'i').test(value)) {
            return clickElement(elem);
          }
        }
      }
    };

    Page.copySelected = function() {
      var text;
      text = getSelected();
      Clipboard.copy(text);
      return CmdBox.set({
        title: "[Copied]" + (text.replace(/^(.{80})(.*)/, '$1...')),
        timeout: 4000
      });
    };

    desc(Page.copySelected, 'Copy selected text');

    Page.showInfo = function() {
      return CmdBox.set({
        title: document.title,
        timeout: 4000
      });
    };

    desc(Page.showInfo, 'Show page info');

    Page.next = function() {
      return execMatch(Option.get('nextpattern'));
    };

    desc(Page.next, 'Paginate forward');

    Page.next.options = {
      nextpattern: {
        description: 'Pattern(s) for next page',
        example: "set nextpattern+=^NextPage|››$ OR set nextpattern=['(下|后)一(页|頁)', '^Next$', '^>$']"
      }
    };

    Page.prev = function() {
      return execMatch(Option.get('previouspattern'));
    };

    desc(Page.prev, 'Paginate backwards');

    Page.prev.options = {
      previouspattern: {
        description: 'Pattern(s) for previous page',
        example: "set previouspattern+=^PrevPage|‹‹$ OR set previouspattern=['(上|前)一(页|頁)', '^Prev(ious)?']"
      }
    };

    return Page;

  })();

}).call(this);
