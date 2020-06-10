import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  role: {
    type: Number,
    enum: ['admin', 'student'],
  },
  level: {
    type: String,
  },
})

const User = mongoose.model('users', userSchema)

export default User
