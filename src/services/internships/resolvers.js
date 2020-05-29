import Internship from './models/intership'

const resolvers = {
  Query: {
    internships: async () => {
      const list = await Internship.find({})
      return list
    },
    internship: async (_, { id }) => {
      const internshhip = await Internship.findById(id)
      return internshhip
    },
  },
  Mutation: {
    createInternship: async (_, { input }) => {
      const newInternship = Internship(input)
      const result = await newInternship.save()
      return result
    },
    updateInternship: async (_, { id, input }) => {
      const result = await Internship.findByIdAndUpdate(id, input)
      return result
    },
    deleteInternship: async (_, { id }) => {
      const internship = await Internship.findById(id)
      if (!internship) return 'Internship not Found!'
      await Internship.findOneAndDelete(id)
      return 'The Internship was deleted successfully'
    },
  },
}

export default resolvers
