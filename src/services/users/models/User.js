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
    type: String,
    enum: ['faculty_manager', 'student', 'company_manager'],
  },
  level: {
    type: String,
    enum: ['engineer', 'license', 'professional_master', 'research_master'],
  },
  companyName: {
    type: String,
  },
  facultyName: {
    type: String,
  },
  description: {
    type: String,
  },
  candidates: {
    type: [Schema.Types.ObjectId],
  },
})

const User = mongoose.model('users', userSchema)

export default User
