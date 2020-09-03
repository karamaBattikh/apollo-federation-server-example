import mongoose, { Schema } from 'mongoose'

const CandidateSchema = new Schema({
  candidate: {
    type: String,
  },
  accepted: {
    type: Boolean,
  },
})

const IntershipSchema = new Schema({
  subject: {
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
  status: {
    type: String,
    enum: ['opened', 'closed'],
    default: 'opened',
  },
  studentAccepted: {
    type: String,
  },
  candidates: {
    type: [CandidateSchema],
  },
})

const Internship = mongoose.model('interships', IntershipSchema)

export default Internship
