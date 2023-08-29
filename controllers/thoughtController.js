const { Thought, User } = require('../models');

const thoughtController = {
	// Get All
	getAllThought(req, res) {
		Thought.find({})
			.populate({
				path: 'reactions',
				select: '-__v',
			})
			.select('-__v')
			.sort({ _id: -1 })
			.then((dbThoughtData) => res.json(dbThoughtData))
			.catch((err) => {
				console.log(err);
				res.sendStatus(400);
			});
	},
	// Get by Id
	getThoughtById({ params }, res) {
		Thought.findOne({ _id: params.id })
			.populate({
				path: 'reactions',
				select: '-__v',
			})
			.select('-__v')
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					return res
						.status(404)
						.json({ message: 'No thought found' });
				}
				res.json(dbThoughtData);
			})
			.catch((err) => {
				console.log(err);
				res.sendStatus(400);
			});
	},
	// Create
	createThought({ params, body }, res) {
		Thought.create(body)
			.then(({ _id }) => {
				return User.findOneAndUpdate(
					{ _id: body.userId },
					{ $push: { thoughts: _id } },
					{ new: true }
				);
			})
			.then((dbUserData) => {
				if (!dbUserData) {
					return res.status(404).json({
						message: 'Thought created but no user found',
					});
				}
				res.json({ message: 'Thought successfully created' });
			})
			.catch((err) => res.json(err));
	},
	// Update
	updateThought({ params, body }, res) {
		Thought.findOneAndUpdate({ _id: params.id }, body, {
			new: true,
			runValidators: true,
		})
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({
						message: 'No thought found',
					});
					return;
				}
				res.json('Thought updated');
			})
			.catch((err) => res.json(err));
	},
	// Delete
	deleteThought({ params }, res) {
		Thought.findOneAndDelete({ _id: params.id })
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					return res
						.status(404)
						.json({ message: 'No thought found' });
				}
				return User.findOneAndUpdate(
					{ thoughts: params.id },
					{ $pull: { thoughts: params.id } },
					{ new: true }
				);
			})
			.then((dbUserData) => {
				if (!dbUserData) {
					return res.status(404).json({
						message: 'Thought deleted but no user found',
					});
				}
				res.json({ message: 'Thought deleted' });
			})
			.catch((err) => res.json(err));
	},
	// Add Reaction
	addReaction({ params, body }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{ $addToSet: { reactions: body } },
			{ new: true }
		)
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({
						message: 'No thought found',
					});
					return;
				}
				res.json('Reaction added');
			})
			.catch((err) => res.json(err));
	},
	// Remove Reaction
	removeReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $pull: { reactions: { _id: req.params.reactionId } } },
			{ new: true }
		).then((dbThoughtData) => {
			if (!dbThoughtData) {
				return res.status(404).json({ message: 'No reaction found' });
			}

			res.json({ message: 'Reaction deleted' });
		});
	},
};

module.exports = thoughtController;
