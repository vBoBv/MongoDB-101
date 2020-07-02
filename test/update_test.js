const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
	let joe;

	beforeEach((done) => {
		joe = new User({ name: 'Joe', likes: 0 });
		joe.save().then(() => done());
	});

	assertName = (operation, done) => {
		operation //operation here will be exactly the same as the operation that has been passed in (Ex: joe.save())
			.then(() => User.find({}))
			.then((users) => {
				assert(users.length === 1);
				assert(users[0].name === 'Alex');
				done();
			});
	};

	it('instance type using set and save', (done) => {
		// console.log(joe);
		joe.set('name', 'Alex');
		// console.log(joe);
		// joe
		// 	.save()
		// 	.then(() => User.find({}))
		// 	.then(users => {
		// 		assert(users.length === 1);
		// 		assert(users[0].name === 'Alex');
		// 		done();
		// 	});
		assertName(joe.save(), done);
	});

	it('A model instance can update', (done) => {
		// joe.update({ name: 'Alex' });
		assertName(joe.update({ name: 'Alex' }), done);
	});

	it('A model class can update', (done) => {
		assertName(User.update({ name: 'Joe' }, { name: 'Alex' }), done);
	});

	it('A model class can update one record', (done) => {
		assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }), done);
	});

	it('A model class can find a record with an Id and update', (done) => {
		assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex' }), done);
	});

	// xit means not to execute this test
	// xit('A user can have their postcount incremented by 1', done => {
	// 	User.update({ name: 'Joe' }, { $inc: { postCount: 10 } })
	// 		.then(() => User.findOne({ name: 'Joe' }))
	// 		.then(user => {
	// 			assert(user.postCount === 10);
	// 			done();
	// 		});
	// });

	it('A user can have their postcount incremented by 1', (done) => {
		User.update({ name: 'Joe' }, { $inc: { likes: 10 } })
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				assert(user.likes === 10);
				done();
			});
	});
});
