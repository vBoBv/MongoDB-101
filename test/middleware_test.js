const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

//Test to see if blogPosts array is deleted when a user is deleted
describe('Middleware', () => {
	let joe, blogPost;

	beforeEach((done) => {
		joe = new User({ name: 'Joe' });
		blogPost = new BlogPost({
			title: 'JS is Great',
			content: 'Yes it is really is'
		});

		joe.blogPosts.push(blogPost);

		Promise.all([joe.save(), blogPost.save()]).then(() => done());
	});

	it('users clean up dangling blogposts on remove', (done) => {
		joe
			.remove()
			.then(() => BlogPost.count())
			.then((count) => {
				assert(count === 0);
				done();
			});
	});
});
