var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var collection = process.argv[2];
var filterKey = process.argv[3];
var filterVal = process.argv[4];

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db('');
  dbo.collection(collection).find({filterKey: filterVal}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
