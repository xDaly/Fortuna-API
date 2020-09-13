import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import { Course } from '../models/index';

autoIncrement.initialize(mongoose.connection);

const courseSchema = mongoose.Schema(
  {
    number: Number,
    title: String,
    tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' },
    formation: { type: mongoose.Schema.Types.ObjectId, ref: 'Formation' }
  },
  {
    timestamps: true
  }
);

courseSchema.plugin(autoIncrement.plugin, {
  model: 'Course',
  field: 'number',
  startAt: 1,
  incrementBy: 1
});

courseSchema.post('save', course => {
  Course.findByIdAndUpdate(course.formation, {
    $push: { course: course._id }
  }).catch(err => {
    console.error(err.message);
    throw new Error(err.message);
  });
  Course.findByIdAndUpdate(course.tutor, {
    $push: { course: course._id }
  }).catch(err => {
    console.error(err.message);
    throw new Error(err.message);
  });
});

courseSchema.post('findOneAndRemove', course => {
  Course.findByIdAndUpdate(course.formation, {
    $pull: { course: course._id }
  }).catch(err => {
    console.error(err.message);
    throw new Error(err.message);
  });
  Course.findByIdAndUpdate(course.tutor, {
    $pull: { course: course._id }
  }).catch(err => {
    console.error(err.message);
    throw new Error(err.message);
  });
});

export default mongoose.model('Course', courseSchema);
