const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of database', () => {
	// let joe;
	// beforeEach((done) => {
	// 	joe = new User({ name: 'Joe' });

	// 	joe.save().then(() => done());
	// });

	let joe, maria, alex, zach;

	beforeEach((done) => {
		joe = new User({ name: 'Joe' });
		alex = new User({ name: 'Alex' });
		maria = new User({ name: 'Maria' });
		zach = new User({ name: 'Zach' });

		Promise.all([joe.save(), alex.save(), maria.save(), zach.save()]).then(() =>
			done()
		);
	});

	it('finds all users with a name of joe', (done) => {
		User.find({ name: 'Joe' }).then((users) => {
			// console.log(users);
			// console.log(users[0]._id);
			// console.log(joe._id);

			// assert(users[0]._id === joe._id);
			assert(users[0]._id.toString() === joe._id.toString());

			done();
		});
	});

	it('find a user with a particular id', (done) => {
		User.findOne({ _id: joe._id }).then((user) => {
			assert(user.name === 'Joe');
			done();
		});
	});

	it('can skip and limit the result set', () => {
		//We find all the user inside our user collection, we skipped joe, then we limit only to have alex and maria
		User.find({})
			.sort({ name: 1 })
			.skip(1)
			.limit(2)
			.then((users) => {
				assert(users.length === 2);
				assert(users[0].name === 'Joe');
				assert(users[1].name === 'Maria');
				done();
			});
	});
});
