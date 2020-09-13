import Formation from '../models/formation';

// Create and Save a new Formation
export const create = async (req, res) => {
  try {
    let formation = new Formation(req.body);
    formation = await formation.save().then(newFormation => newFormation);
    return res.status(201).json(formation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Retrieve and return all formations from the database.
export const findAll = async (req, res) => {
  try {
    const formations = await Formation.find().populate('cours');
    return res.status(200).json(formations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Find a single formation with a formationId
export const findOne = async (req, res) => {
  try {
    const formation = await Formation.findById(req.params.formationId).populate('cours');
    if (!formation) {
      return res.status(404).send({
        message: 'Formation not found with id ' + req.params.formationId
      });
    }
    return res.status(200).json(formation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Update a formation identified by the formationId in the request
export const update = async (req, res) => {
  // Find formation and update it with the request body
  try {
    const formation = await Formation.findByIdAndUpdate(req.params.formationId, { $set: req.body }, { new: true });
    if (!formation) {
      return res.status(404).send({
        message: 'Formation not found with id ' + req.params.formationId
      });
    }
    return res.status(200).json(formation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Delete a formation with the specified formationId in the request
export const remove = async (req, res) => {
  try {
    const formation = await Formation.findByIdAndRemove(req.params.formationId);
    if (!formation) {
      return res.status(404).send({
        message: 'Formation not found with id ' + req.params.formationId
      });
    }
    return res.status(204).json({ message: 'Formation deleted successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
