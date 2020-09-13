import mongoose from 'mongoose';
import validator from 'validator';

const trainerSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: value => {
        return validator.isEmail(value);
      }
    },
    cin: {
      type: Number,
      required: true,
      unique: true
    },
    tel: {
      type: Number,
      required: true,
      unique: true
    },
    address: String,
    degree: Number,
    diploma: String,
    costPerHour: Number,
    commitmentType: {
      type: String,
      enum: ['fullTime', 'partTime', 'freelance', 'other'],
      default: 'fullTime'
    },
    note: String,
    course: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Trainer', trainerSchema);
