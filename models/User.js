const { Schema, model } = require('mongoose');

const userSchema = new Schema(
	{
		userName: {
			type: String,
			unique: true,
			required: 'Username is required',
			trim: true,
		},
		email: {
			type: String,
			required: 'Email is required',
			unique: true,
			match: [/.+@.+\..+/],
		},
		thought: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Thought',
			},
		],
		friends: [
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

const User = model('user', userSchema);

module.exports = User;
