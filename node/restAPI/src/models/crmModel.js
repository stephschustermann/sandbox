var mongoose = require('mongoose');
var schema = mongoose.schema;

var blogSchema = new schema({
    title: String,
    author: String,
    body: String,
})

module.exports = blogSchema;