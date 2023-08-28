const { Schema, model } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId(),
		},
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
		username: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (createdAtVal) =>
				moment(createdAtVal).format('MMM DD, YY [at] hh:mm a'),
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

const thoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: 'Thought text is required',
			minlength: 1,
			maxlength: 280,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (createdAtVal) =>
				moment(createdAtVal).format('MMM DD, YY [at] hh:mm a'),
		},
		username: {
			type: String,
			required: true,
		},
		reactions: [reactionSchema],
	},

	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
		id: false,
	}
);

thoughtSchema.virtual('reactionCount').get(function () {
	return this.reaction.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
