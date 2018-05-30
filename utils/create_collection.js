var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var collection = process.argv[2];

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("photos");
  dbo.createCollection(collection, function(err, res) {
    if (err) throw err;
    console.log("Collection: " + collection + " created!");
    db.close();
  });
});
