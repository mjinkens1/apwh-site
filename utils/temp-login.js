const crypto = require('crypto');

var id = crypto.randomBytes(4).toString('hex') + '@djinkens.com';
var password = crypto.randomBytes(6).toString('hex');
console.log(id, password)
