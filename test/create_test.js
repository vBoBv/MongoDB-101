const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
	it('saves a user', done => {
		// assert(1 + 1 === 3);

		const joe = new User({ name: 'Joe' });

		joe.save().then(() => {
			assert(!joe.isNew);
			done();
		});
	});
});
