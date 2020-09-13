import Trainer from '../models/trainer';

// Create and Save a new Trainer
export const create = async (req, res) => {
  try {
    let trainer = new Trainer(req.body);
    trainer = await trainer.save().then(newTrainer => newTrainer);
    return res.status(201).json(trainer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Retrieve and return all trainers from the database.
export const findAll = async (req, res) => {
  try {
    const trainer = await Trainer.find()
      .populate({ path: 'students', model: 'User', select: '-password' })
      .populate('formations');
    return res.status(200).json(trainer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Find a single trainer with a trainerId
export const findOne = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.trainerId)
      .populate({ path: 'students', model: 'User', select: '-password' })
      .populate('formations');
    if (!trainer) {
      return res.status(404).send({
        message: 'Trainer not found with id ' + req.params.trainerId
      });
    }
    return res.status(200).json(trainer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Update a trainer identified by the trainerId in the request
export const update = async (req, res) => {
  // Find trainer and update it with the request body
  try {
    const trainer = await Trainer.findByIdAndUpdate(req.params.trainerId, { $set: req.body }, { new: true });
    if (!trainer) {
      return res.status(404).send({
        message: 'Trainer not found with id ' + req.params.trainerId
      });
    }
    return res.status(200).json(trainer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Delete a trainer with the specified trainerId in the request
export const remove = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndRemove(req.params.trainerId);
    if (!trainer) {
      return res.status(404).send({
        message: 'Trainer not found with id ' + req.params.trainerId
      });
    }
    return res.status(204).json({ message: 'Trainer deleted successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
