import mongoose, { Schema } from 'mongoose'

const planningSchema = new Schema({
  date: {
    type: Date,
  },
  time: {
    type: String,
  },
  duration: {
    type: String,
  },
  note: {
    type: Number,
  },
  reporter: {
    type: String,
  },
  jury: {
    type: String,
  },
  supervisorFaculty: {
    type: String,
  },
  candidate: {
    type: Schema.Types.ObjectId,
  },
})

const Planning = mongoose.model('plannings', planningSchema)

export default Planning
