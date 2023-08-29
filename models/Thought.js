const { Schema, model } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId(),
		},
		reactionBody: {
			type: String,
			required: true,
			maxlength: 280,
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
			getters: true,
		},
		id: false,
	}
);

const thoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: 'Thought is Required',
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
		reactions: [ReactionSchema],
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
	return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
