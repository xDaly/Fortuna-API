import Student from '../models/student';

// Create and Save a new Student
export const create = async (req, res) => {
  try {
    let student = new Student(req.body);
    student = await student.save().then(newStudent => newStudent);
    return res.status(201).json(student);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Retrieve and return all students from the database.
export const findAll = async (req, res) => {
  try {
    const student = await Student.find()
      .populate({ path: 'students', model: 'User', select: '-password' })
      .populate('formations');
    return res.status(200).json(student);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Find a single student with a studentId
export const findOne = async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId)
      .populate({ path: 'students', model: 'User', select: '-password' })
      .populate('formations');
    if (!student) {
      return res.status(404).send({
        message: 'Student not found with id ' + req.params.studentId
      });
    }
    return res.status(200).json(student);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Update a student identified by the studentId in the request
export const update = async (req, res) => {
  // Find student and update it with the request body
  try {
    const student = await Student.findByIdAndUpdate(req.params.studentId, { $set: req.body }, { new: true });
    if (!student) {
      return res.status(404).send({
        message: 'Student not found with id ' + req.params.studentId
      });
    }
    return res.status(200).json(student);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Delete a student with the specified studentId in the request
export const remove = async (req, res) => {
  try {
    const student = await Student.findByIdAndRemove(req.params.studentId);
    if (!student) {
      return res.status(404).send({
        message: 'Student not found with id ' + req.params.studentId
      });
    }
    return res.status(204).json({ message: 'Student deleted successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
