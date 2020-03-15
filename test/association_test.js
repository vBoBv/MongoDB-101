const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associates', () => {
	let joe, blogPost, comment;

	beforeEach(done => {
		joe = new User({ name: 'Joe' });
		blogPost = new BlogPost({
			title: 'JS is Great',
			content: 'Yes it is really is'
		});
		comment = new Comment({ content: 'Congrats on great post' });

		joe.blogPost.push(blogPost);
		blogPost.comments.push(comment);
		comment.user = joe;
	});
});
