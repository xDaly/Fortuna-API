import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

autoIncrement.initialize(mongoose.connection);

const formationSchema = mongoose.Schema(
  {
    number: Number,
    title: String,
    course: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
  },
  {
    timestamps: true
  }
);

formationSchema.plugin(autoIncrement.plugin, {
  model: 'Formation',
  field: 'number',
  startAt: 1,
  incrementBy: 1
});

export default mongoose.model('Formation', formationSchema);
