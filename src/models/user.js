import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    initials: String,
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: value => {
        return validator.isEmail(value);
      }
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'tutor', 'student'],
      default: 'student'
    },
    image: String,
    deleted: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

// userSchema.index({email:1}, {unique:true})

userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    return next();
  });
});

userSchema.pre('findOneAndUpdate', function(next) {
  const user = this._update.$set;
  if (user.password) {
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      return next();
    });
  }
  return next();
});

userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

userSchema.methods.getInitials = function() {
  return this.firstName[0] + this.lastName[0];
};

export default mongoose.model('User', userSchema);
