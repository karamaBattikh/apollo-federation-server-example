import mongoose, { Schema } from 'mongoose'

const IntershipSchema = new Schema({
  subject: {
    type: String,
  },
  duration: {
    type: String,
  },
  level: {
    type: String,
  },
  keyword: {
    type: String,
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  supervisorCompany: {
    type: String,
  },
  supervisorFaculty: {
    type: String,
  },
})

const Internship = mongoose.model('interships', IntershipSchema)

export default Internship
