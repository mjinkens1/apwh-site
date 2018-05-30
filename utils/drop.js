var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var collection = process.argv[2];

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("photos");
  dbo.collection(collection).drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection " + collection + " deleted from database " + db);
    db.close();
  });
});
