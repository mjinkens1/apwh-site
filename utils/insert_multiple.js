var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
https://s3.amazonaws.com/mjinkens/alpine-lake.jpg
// https://www.dropbox.com/s/6ercywtjh4rfn3l/alpine-lake.jpg?raw=1
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("content-schema");
  var myobj = [
    {schema: "announcement", content: return "<div class='container-fluid info-box mb-2 p-1 px-2'><a href='' class='fas fa-times admin admin-delete ml-2' title='Discard changes'></a><a href='' class='fas fa-check admin admin-save' title='Save changes'></a><h5 class='editable'>Title</h5><p class='editable'>Text</p></div>"},
    {schema: "file", content: ""},
    {schema: "link", content: ""}
  ];
  dbo.collection("colorado").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});
