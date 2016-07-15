// Generated by CoffeeScript 1.10.0
(function() {
  $.fn.reverse = [].reverse;

  String.prototype.startsWith = function(str) {
    if (str === void 0) {
      return true;
    }
    return this.substring(0, str.length) === str;
  };

  String.prototype.endsWith = function(str) {
    if (str === void 0) {
      return true;
    }
    return this.substring(this.length - str.length, this.length) === str;
  };

  String.prototype.isValidURL = function() {
    return /(?:https?|ftp|file|chrome|chrome-extension):\/\//.test(this);
  };

  String.prototype.getValidURL = function() {
    if (this.isValidURL()) {
      return this;
    } else {
      return "http://" + this;
    }
  };

  String.prototype.trimFirst = function(str) {
    return this.trimFirstStr(str).trim();
  };

  String.prototype.trimFirstStr = function(str) {
    if (this.startsWith(str)) {
      return this.substring(str.length);
    }
    return this;
  };

  String.prototype.escape = function() {
    return $('<div>').text(this).html();
  };

  String.prototype.isUpperCaseLetter = function() {
    return this.length === 1 && this >= 'A' && this <= 'Z';
  };

  Math.sign = function(number) {
    if (number < 0) {
      return -1;
    } else if (number > 0) {
      return 1;
    } else {
      return 0;
    }
  };

}).call(this);
