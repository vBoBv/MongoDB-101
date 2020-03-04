//This is a schema only, not a model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	title: String
});

module.exports = PostSchema;
