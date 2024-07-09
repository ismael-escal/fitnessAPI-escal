const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({

	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'UserID is required'] // associated with user who owns the workout
	},
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    duration: {
        type: String,
        required: [true, 'Duration is required']
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'pending'
    }
});

module.exports = mongoose.model('Workout', workoutSchema);