const mongoose = require('mongoose');
const crypto = require('crypto');

var contentSchema = mongoose.Schema({
    content: {
      contentType: String,
      templateHTML: String,
      contentHTML: String,
      filepath: String,
      id: String,
      container: String,
      file: String,
      day: String,
      month: String,
      year: String
    }
});

module.exports = mongoose.model('Content', contentSchema);
