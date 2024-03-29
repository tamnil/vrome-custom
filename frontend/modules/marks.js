// Generated by CoffeeScript 1.10.0
(function() {
  window.Marks = (function() {
    var filterQuickMarks, handleAddMark;

    function Marks() {}

    Marks.addLocalMark = function() {
      var key, localMarks, settingKey;
      key = getKey(this);
      settingKey = key.isUpperCaseLetter() ? '@local_marks' : 'local_marks';
      localMarks = Settings.get(settingKey) || {};
      localMarks[key] = [window.scrollX, window.scrollY, location.href];
      Settings.add(settingKey, localMarks);
      return CmdBox.set({
        title: "Added Local Mark " + key,
        timeout: 1000
      });
    };

    desc(Marks.addLocalMark, "Mark position x,y on the page: e.g 'ma'");

    Marks.gotoLocalMark = function() {
      var key, position, ref, settingKey;
      key = getKey(this);
      settingKey = key.isUpperCaseLetter() ? '@local_marks' : 'local_marks';
      position = (ref = Settings.get(settingKey)) != null ? ref[key] : void 0;
      if ($.isArray(position)) {
        if (key.isUpperCaseLetter()) {
          return Post({
            action: 'Tab.update',
            url: position[2],
            callback: "scrollTo(" + position[0] + ", " + position[1] + ")"
          });
        } else {
          return scrollTo(position[0], position[1]);
        }
      } else {
        return CmdBox.set({
          title: "Mark " + key + " not set",
          timeout: 1000
        });
      }
    };

    desc(Marks.gotoLocalMark, "Go to marked position on the page: e.g 'a");

    filterQuickMarks = function(newTab) {
      return function(keyword) {
        var cuteMarks, key, mark, marks;
        marks = Settings.get('@url_marks') || {};
        cuteMarks = (function() {
          var results;
          results = [];
          for (key in marks) {
            mark = marks[key];
            if (key.startsWith(keyword)) {
              results.push({
                title: key,
                url: mark
              });
            }
          }
          return results;
        })();
        if (cuteMarks.length === 1) {
          return Post({
            action: 'Tab.openUrl',
            url: cuteMarks[0]['url'],
            newTab: newTab
          });
        } else {
          return Dialog.draw({
            urls: cuteMarks,
            keyword: ''
          });
        }
      };
    };

    Marks.addQuickMark = function() {
      return Dialog.start({
        title: 'Add Quick Mark',
        search: filterQuickMarks(false),
        pressUp: handleAddMark
      });
    };

    desc(Marks.addQuickMark, 'Add new quick mark for the current URL');

    Marks.gotoQuickMarkNewTab = function() {
      return Marks.gotoQuickMark(true);
    };

    desc(Marks.gotoQuickMarkNewTab, 'Same as `go`, but open in a new tab (support Dialog extend mode)');

    Marks.gotoQuickMark = function(newTab) {
      var title;
      title = newTab ? 'Open Quick Mark (new tab)' : 'Open Quick Mark';
      return Dialog.start({
        title: title,
        search: filterQuickMarks(newTab),
        newTab: newTab
      });
    };

    desc(Marks.gotoQuickMark, 'Go to quick mark (support Dialog extend mode)');

    Marks.deleteQuickMark = function(keyword) {
      var marks;
      marks = Settings.get('url_marks') || {};
      if (marks[keyword]) {
        delete marks[keyword];
      }
      return Settings.add({
        url_marks: marks
      });
    };

    handleAddMark = function(e) {
      var key, keyword, ref;
      ref = [getKey(e, CmdBox.get().content.trim())], key = ref[0], keyword = ref[1];
      if (isAcceptKey(key)) {
        Settings.add("@url_marks." + keyword, window.location.href);
        Dialog.stop(true);
        return CmdBox.set({
          title: "Added Quick Mark " + keyword,
          timeout: 2000
        });
      }
    };

    return Marks;

  })();

}).call(this);
