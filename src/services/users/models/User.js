import mongoose, { Schema } from 'mongoose'

const internshipSchema = new Schema({
  internship: {
    type: Schema.Types.ObjectId,
  },
  accepted: {
    type: Boolean,
  },
})

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
    type: [internshipSchema],
  },
})

const User = mongoose.model('users', userSchema)

export default User
