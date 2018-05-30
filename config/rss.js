const request = require('request');

exports.getRSS = function() {
var rssURL = 'http://rss.cnn.com/services/podcasting/cnn10/rss.xml';
  return new Promise((res, rej) => {
    return request.get({
      url: rssURL
    }, function(err, httpResponse, body){
      if(err)
        console.warn("Error: ", err);

      if(httpResponse)

      if(body) {
        res(body)
      }
    });
  });
};
