import multer from 'multer';
import uuid from 'uuid';
import jimp from 'jimp';
import { join } from 'path';
import User from '../models/user.js';

// upload image middelwer
const storage = multer.memoryStorage();

const fileFilter = (req, file, next) => {
  if (file.mimetype.startsWith('image/')) {
    next(null, true);
    return;
  }
  next(null, false);
};

const multerOptions = {
  storage,
  fileFilter
};

export const upload = multer(multerOptions).single('file');

export const saveFile = async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  const extension = req.file.mimetype.split('/')[1];
  const fileName = `user${req.params.id || uuid.v4()}.${extension}`;
  let folder;
  if (process.platform === 'win32') {
    folder = join(process.env.APPDATA, 'hapt', 'users');
  } else {
    folder = join(process.env.HOME, '.config', 'hapt', 'users');
  }
  try {
    const image = await jimp.read(req.file.buffer);
    await image.resize(jimp.AUTO, 360);
    await image.write(`${folder}/${fileName}`);
    req.body.image = `/files/users/${fileName}`;
    next();
  } catch (e) {
    next(e);
  }
};

// Create and Save a new User
export const createNoPermission = (req, res) => {
  // Validate request
  if (!req.body.email) {
    return res.status(400).json({
      message: 'email can not be empty'
    });
  }
  // Create a User
  const user = new User(req.body);
  user.role = 'student';
  // Save User in the database
  user
    .save()
    .then(data => {
      return res.status(201).json(data);
    })
    .catch(err => {
      return res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.'
      });
    });
};

// Create and Save a new User
export const create = (req, res) => {
  // Validate request
  if (!req.body.email) {
    return res.status(400).json({
      message: 'email can not be empty'
    });
  }
  // Create a User
  const user = new User(req.body);
  const initials = User.getInitials();
  user.initials = initials;
  // Save User in the database
  user
    .save()
    .then(data => {
      return res.status(201).json(data);
    })
    .catch(err => {
      return res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.'
      });
    });
};

// Retrieve and return all users from the database.
export const findAll = (req, res) => {
  if (req.query.page && req.query.limit) {
    return User.find()
      .skip(req.query.page * req.query.limit)
      .limit(req.query.limit)
      .exec()
      .then(users => {
        return res.status(200).json(users);
      })
      .catch(err => {
        return res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.'
        });
      });
  }
  return User.find()
    .then(users => {
      return res.status(200).json(users);
    })
    .catch(err => {
      return res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.'
      });
    });
};

// Find a single user with a userId
export const findOne = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userId
        });
      }
      return res.status(200).json(user);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving user with id ' + req.params.userId
      });
    });
};

// Update a user identified by the userId in the request
export const update = (req, res) => {
  // Find user and update it with the request body
  User.findByIdAndUpdate(req.params.userId, { $set: req.body }, { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userId
        });
      }
      return res.status(200).json(user);
    })
    .catch(err => {
      //   if (err.kind === "ObjectId") {
      //     return res.status(404).send({
      //       message: "User not found with id " + req.params.userId
      //     });
      //   }
      console.error(err);
      return res.status(500).send({
        message: 'Error updating user with id ' + req.params.userId
      });
    });
};

// Delete a user with the specified userId in the request
export const remove = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userId
        });
      }
      return res.status(204).json({ message: 'User deleted successfully!' });
    })
    .catch(err => {
      //   if (err.kind === "ObjectId" || err.name === "NotFound") {
      //     return res.status(404).send({
      //       message: "User not found with id " + req.params.userId
      //     });
      //   }
      console.error(err);
      return res.status(500).send({
        message: 'Could not delete user with id ' + req.params.userId
      });
    });
};
