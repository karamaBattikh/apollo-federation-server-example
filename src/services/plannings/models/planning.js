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
  reporter: {
    type: String,
  },
  jury: {
    type: String,
  },
  note: {
    type: Number,
  },
})

const Planning = mongoose.model('plannings', planningSchema)

export default Planning
