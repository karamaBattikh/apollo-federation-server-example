import mongoose, { Schema } from 'mongoose'

const IntershipSchema = new Schema({
  title: {
    type: String,
  },
  duration: {
    type: String,
  },
  location: {
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
