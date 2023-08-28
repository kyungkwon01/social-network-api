const { User, Thought } = require('../models');

const userController = {
	getAllUsers(req, res) {
		User.find({})
			.populate({
				path: 'thoughts',
				select: '-__v',
			})
			.select('-__v')
			.sort({ _id: -1 })
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log(err);
				res.sendStatus(400);
			});
	},
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
			.select('-__v')
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
	createUser({ body }, res) {
		User.create(body)
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.json(err));
	},
	updateUser({ params, body }, res) {
		User.findOneAndUpdate({ _id: params.id }, body, {
			new: true,
			runValidators: true,
		})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: 'No user found' });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.sendStatus(400);
			});
	},
	deleteUser({ params }, res) {
		User.findOneAndDelete({ _id: params.id })
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({
						message: 'No user found',
					});
					return Thought.deleteMany({
						_id: { $in: dbUserData.thoughts },
					});
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.sendStatus(400);
			});
	},
	addFriend({ params }, res) {
		User.findOneAndUpdate(
			{ _id: params.id },
			{
				$addToSet: {
					friends: params.friendsId,
				},
			},
			{ new: true }
		)
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log(err);
				res.sendStatus(400);
			});
	},

	removeFriend({ params }, res) {
		User.findOneAndUpdate(
			{ _id: params.id },
			{
				$pull: {
					friends: params.friendsId,
				},
			},
			{ new: true }
		)
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({
						message: 'No user found',
					});
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.sendStatus(400);
			});
	},
};

module.export = userController;
