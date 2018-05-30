

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("photos");
  dbo.listCollections().toArray(function(err, collInfos) {
    console.log(collInfos);
  });
  db.close();
});
