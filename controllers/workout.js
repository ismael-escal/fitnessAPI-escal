const Workout = require("../models/Workout");

module.exports.addWorkout = (req,res) => {

	const userId = req.user.id;
	let newWorkout = new Workout({
		userId: userId,
		name : req.body.name,
		duration : req.body.duration
	});

	newWorkout.save()
	.then(savedWorkout => res.status(201).send(savedWorkout))
	.catch(saveErr => {

		console.error("Error in saving the workout: ", saveErr)
		return res.status(500).send({ error: 'Failed to save the workout' });
	})

};

module.exports.getAllWorkout = async (req, res) => {

	const userId = req.user.id;

    try {
        const workouts = await Workout.find({ userId });

        if (!workouts.length) {
            return res.status(404).send({ message: 'No workouts found.' });
        }

        res.status(200).send({ workouts });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

};

module.exports.getSpecificWorkout = async (req, res) => {

    const workoutId = req.params.id;
    const userId = req.user.id;

    try {
        const workout = await Workout.findById(workoutId);

        if (workout.userId != userId){
            return res.status(404).send({ message: 'No workouts found.' });
        }

        if (!workout) {
            return res.status(404).send({ message: 'No workouts found.' });
        }

        res.status(200).send({ workout });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

};

module.exports.updateWorkout = (req, res) => {

	let workoutUpdates = {
        name: req.body.name,
        duration: req.body.duration
    }

    return Workout.findByIdAndUpdate(req.params.id, workoutUpdates, { new: true })
    .then(updatedWorkout => {

        if (!updatedWorkout) {

            return res.status(404).send({ error: 'Workout not found' });

        }

        return res.status(200).send({ 
        	message: 'Workout updated successfully', 
        	updatedWorkout
        });

    })
    .catch(err => {
		console.error("Error in updating the Workout : ", err)
		return res.status(500).send({ error: 'Error in updating the Workout.' });
	});
};

module.exports.deleteWorkout = (req, res) => {

    return Workout.deleteOne({ _id: req.params.id})
    .then(deletedResult => {

        if (deletedResult.deletedCount === 0) {

            return res.status(400).send({ error: 'No Workout deleted' });

        }

        return res.status(200).send({ 
        	message: 'Workout deleted successfully',
        });

    })
    .catch(err => {
		console.error("Error in deleting the Workout : ", err)
		return res.status(500).send({ error: 'Error in deleting the Workout.' });
	});
};

module.exports.completeWorkout = (req, res) => {

	let workoutId = req.params.id;
	let completedWorkout = {
		status: "completed"
	}

    return Workout.findByIdAndUpdate(workoutId, completedWorkout, { new: true }).then(updatedWorkout => {

        if (updatedWorkout) {

            res.status(200).send({
            	message: 'Workout status updated successfully', 
            	updatedWorkout
            });

        } else {

            res.status(404).send({ error: 'Workout not found' });
        }
    }).catch(updateErr => {

		console.error('Error in updating the Workout: ', updateErr);
		return res.status(500).send({ error: 'Failed to update the Workout' });
	});
};