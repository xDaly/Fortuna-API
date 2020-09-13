import Course from '../models/course';

// Create and Save a new Course
export const create = async (req, res) => {
  try {
    let course = new Course(req.body);
    course = await course.save().then(newCourse => newCourse);
    return res.status(201).json(course);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Retrieve and return all courses from the database.
export const findAll = async (req, res) => {
  try {
    const course = await Course.find()
      .populate({ path: 'students', model: 'User', select: '-password' })
      .populate('formations');
    return res.status(200).json(course);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Find a single course with a courseId
export const findOne = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId)
      .populate({ path: 'students', model: 'User', select: '-password' })
      .populate('formations');
    if (!course) {
      return res.status(404).send({
        message: 'Course not found with id ' + req.params.courseId
      });
    }
    return res.status(200).json(course);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Update a course identified by the courseId in the request
export const update = async (req, res) => {
  // Find course and update it with the request body
  try {
    const course = await Course.findByIdAndUpdate(req.params.courseId, { $set: req.body }, { new: true });
    if (!course) {
      return res.status(404).send({
        message: 'Course not found with id ' + req.params.courseId
      });
    }
    return res.status(200).json(course);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Delete a course with the specified courseId in the request
export const remove = async (req, res) => {
  try {
    const course = await Course.findByIdAndRemove(req.params.courseId);
    if (!course) {
      return res.status(404).send({
        message: 'Course not found with id ' + req.params.courseId
      });
    }
    return res.status(204).json({ message: 'Course deleted successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
