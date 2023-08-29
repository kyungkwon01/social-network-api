const { User, Thought } = require('../models');

const userController = {
	// Get All
	getAllUser(req, res) {
		Thought.find({})
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log(err);
				res.sendStatus(400);
			});
	},
	// Get by Id
	getUserById({ params }, res) {
		User.findOne({ _id: params.id })
			.populate({
				path: 'thoughts',
				select: '-__v',
			})
			.populate({
				path: 'friends',
				select: '-__v',
			})
			.then((dbUserData) => {
				if (!dbUserData) {
					return res.status(404).json({ message: 'No user found' });
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.sendStatus(400);
			});
	},
	// Create
	createUser({ body }, res) {
		User.create(body)
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.json(err));
	},
	// Update
	updateUser({ params, body }, res) {
		User.findOneAndUpdate({ _id: params.id }, body, {
			new: true,
			runValidators: true,
		})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({
						message: 'No user found',
					});
					return;
				}
				res.json('User Updated');
			})
			.catch((err) => res.json(err));
	},
	// Delete
	deleteUser({ params }, res) {
		User.findOneAndDelete({ _id: params.id })
			.then((dbUserData) => {
				if (!dbUserData) {
					return res.status(404).json({ message: 'No user found' });
				}
				// Delete Thoughts Within User
				return Thought.deleteMany({
					_id: { $in: dbUserData.thoughts },
				});
			})
			.then(() => {
				res.json({ message: 'User deleted' });
			})
			.catch((err) => res.json(err));
	},
	// Add Friends
	addFriend({ params }, res) {
		User.findOneAndUpdate(
			{ _id: params.userId },
			{ $addToSet: { friends: params.friendId } },
			{ new: true, runValidators: true }
		)
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: 'No user found' });
					return;
				}
				res.json('Friend Added');
			})
			.catch((err) => res.json(err));
	},
	// Remove Friends
	removeFriend({ params }, res) {
		User.findOneAndUpdate(
			{ _id: params.userId },
			{ $pull: { friends: params.friendId } },
			{ new: true }
		)
			.then((dbUserData) => {
				if (!dbUserData) {
					return res.status(404).json({ message: 'No user found' });
				}
				res.json('Friend removed');
			})
			.catch((err) => res.json(err));
	},
};
module.exports = userController;
