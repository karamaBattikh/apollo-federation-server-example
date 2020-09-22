import mongoose, { Schema } from 'mongoose'

const candidateSchema = new Schema({
  internship: {
    type: Schema.Types.ObjectId,
  },
  student: {
    type: Schema.Types.ObjectId,
  },
  status: {
    type: String,
    enum: ['refuse', 'interview', 'accept', 'untreated'],
    default: 'untreated',
  },
})

const Candidate = mongoose.model('candidates', candidateSchema)

export default Candidate
