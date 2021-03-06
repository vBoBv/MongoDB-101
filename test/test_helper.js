const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
	mongoose.connect('mongodb://localhost/users_test');
	mongoose.connection
		// .once('open', () => console.log('Good to go!'))
		.once('open', () => done())
		.on('error', (error) => {
			console.warn('Warning', error);
		});
});

// mongoose.connect('mongodb://localhost/users_test');
// mongoose.connection
// 	.once('open', () => console.log('Good to go!'))
// 	.on('error', error => {
// 		console.warn('Warning', error);
// 	});

// beforeEach(done => {
// 	mongoose.connection.collections.users.drop(() => {
// 		//Ready to run the next test!
// 		done();
// 	});
// });

beforeEach((done) => {
	const { users, comments, blogposts } = mongoose.connection.collections; //Lower case is important for each collections because mongoose automatically lower case all the collection names

	users.drop(() => {
		comments.drop(() => {
			blogposts.drop(() => {
				done();
			});
		});
	});
});
