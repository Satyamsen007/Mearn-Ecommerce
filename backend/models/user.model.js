import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
// Create a User Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    trim: true,
    maxLength: [30, 'Name cannot exceed 30 characters'],
    minLength: [4, 'Name should have more than 4 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minLength: [8, 'Password should be greater than 8 characters'],
    select: false,
  },
  avatar: {
    publicId: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  role: {
    type: String,
    default: 'user'
  },
  refreshToken: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordTokenExpiry: {
    type: String,
  }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = await bcrypt.hash(this.password, 12)
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id, email: this.email }, process.env.ACCESS_TOKEN_SECRETE_KEY, { expiresIn: `${process.env.ACCESS_TOKEN_EXPIRY_DATE}d` })
}
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRETE_KEY, { expiresIn: `${process.env.REFRESH_TOKEN_EXPIRY_DATE}d` })
}

export const User = mongoose.model('User', userSchema);