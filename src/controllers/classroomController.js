import Classroom from '../models/classroom';

// Create and Save a new Classroom
export const create = async (req, res) => {
  try {
    let classroom = new Classroom(req.body);
    classroom = await classroom.save().then(newClassroom => newClassroom);
    return res.status(201).json(classroom);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Retrieve and return all classrooms from the database.
export const findAll = async (req, res) => {
  try {
    const classrooms = await Classroom.find()
      .populate({ path: 'students', model: 'User', select: '-password' })
      .populate('formations');
    return res.status(200).json(classrooms);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Find a single classroom with a classroomId
export const findOne = async (req, res) => {
  try {
    const classroomObj = await Classroom.findById(req.params.classroomId)
      .populate({ path: 'students', model: 'User', select: '-password' })
      .populate('formations');
    if (!classroomObj) {
      return res.status(404).send({
        message: 'Classroom not found with id ' + req.params.classroomId
      });
    }
    return res.status(200).json(classroomObj);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Update a classroom identified by the classroomId in the request
export const update = async (req, res) => {
  // Find classroom and update it with the request body
  try {
    const classroomObj = await Classroom.findByIdAndUpdate(req.params.classroomId, { $set: req.body }, { new: true });
    if (!classroomObj) {
      return res.status(404).send({
        message: 'Classroom not found with id ' + req.params.classroomId
      });
    }
    return res.status(200).json(classroomObj);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Delete a classroom with the specified classroomId in the request
export const remove = async (req, res) => {
  try {
    const classroomObj = await Classroom.findByIdAndRemove(req.params.classroomId);
    if (!classroomObj) {
      return res.status(404).send({
        message: 'Classroom not found with id ' + req.params.classroomId
      });
    }
    return res.status(204).json({ message: 'Classroom deleted successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
