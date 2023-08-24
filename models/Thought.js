const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: true,
			maxlength: 280,
		},
		createdAt: {
			type: String,
			required: 'Email is required',
			unique: true,
			match: [/.+@.+\..+/],
		},
		username: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Thought',
			},
		],
		reactions: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
