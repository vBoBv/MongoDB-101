const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	// name: String,
	name: {
		type: String,
		validate: {
			validator: name => name.length > 2,
			message: 'Name must be longer than 2 characters.'
		},
		required: [true, 'Name is required.']
	},
	// postCount: Number,
	posts: [PostSchema],
	likes: Number,
	blogPosts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'blogPost'
		}
	]
});

UserSchema.virtual('postCount').get(function() {
	// console.log('Hi');
	return this.posts.length;
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
