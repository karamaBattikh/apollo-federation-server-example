import mongoose, { Schema } from 'mongoose'

const CompanySchema = new Schema({
  Name: {
    type: String,
  },
  businessManager: {
    type: String,
  },
  description: {
    type: String,
  },
})

const Company = mongoose.model('interships', CompanySchema)

export default Company
