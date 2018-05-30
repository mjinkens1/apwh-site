const request = require('request');

var email = process.argv[2];
var password = process.argv[3];

console.log('adding user: ', email);

request.post({
  url:'http://djinkens.com/apwh/register',
  form: {
    email: email,
    password: password
  }
}, function(err,httpResponse,body){
  if(err)
    console.warn("Error: ", err);

  if(httpResponse)
    console.log("Response: ", httpResponse);

  if(body)
    console.log("Body: ", body);
});
