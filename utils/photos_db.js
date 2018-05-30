var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

exports.getPhotos = function(collection, filter){
  return new Promise((res, rej) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("photos");
      dbo.collection(collection).find(filter).toArray(function(err, result) {
        if (err) rej(err);
        db.close();
        res(result);
      });
    });
  });
};

exports.getPhotos("colorado", {trip: "Rocky Mountain National Park"}).then(photos => {
  console.log(photos)
})
