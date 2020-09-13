import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

autoIncrement.initialize(mongoose.connection);

const classroomSchema = mongoose.Schema(
  {
    number: Number,
    name: String,
    capacity: Number,
    description: String
  },
  {
    timestamps: true
  }
);

classroomSchema.plugin(autoIncrement.plugin, {
  model: 'Classroom',
  field: 'number',
  startAt: 1,
  incrementBy: 1
});

export default mongoose.model('Classroom', classroomSchema);
