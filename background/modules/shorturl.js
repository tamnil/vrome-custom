// Generated by CoffeeScript 1.10.0
(function() {
  var SERVER_URL;

  SERVER_URL = 'https://www.googleapis.com/urlshortener/v1/url';

  window.shortUrl = function(msg) {
    var auth, headers, params, sendBackCurrentUrl;
    sendBackCurrentUrl = function() {
      return Post(msg.tab, {
        action: 'Url.shortUrl',
        url: msg.tab.url
      });
    };
    auth = oauth.hasToken();
    headers = {
      'Content-type': 'application/json'
    };
    if (auth) {
      headers['Authorization'] = oauth.getAuthorizationHeader(SERVER_URL, 'POST');
    }
    params = {
      type: 'POST',
      url: SERVER_URL,
      headers: headers,
      data: JSON.stringify({
        longUrl: encodeURI(msg.tab.url)
      })
    };
    return $.ajax(params).fail(sendBackCurrentUrl).done(function(response) {
      var ref;
      if (((ref = response.error) != null ? ref.code : void 0) === '401') {
        oauth.clearTokens();
        return sendBackCurrentUrl();
      } else {
        return Post(msg.tab, {
          action: 'Url.shortUrl',
          url: response.id
        });
      }
    });
  };

}).call(this);
