import mongoose, { Schema } from 'mongoose'

// const internshipSchema = new Schema({
//   internship: {
//     type: String,
//   },
//   accepted: {
//     type: Boolean,
//   },
// })

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
  internshipsParticipated: {
    type: [String],
  },
})

const User = mongoose.model('users', userSchema)

export default User
