import Internship from './models/intership'

const resolvers = {
  Query: {
    internships: async () => {
      return Internship.find({})
    },
  },
  Mutation: {
    createInternship: async (_, { input }) => {
      const newInternship = Internship(input)
      const result = await newInternship.save()
      return result
    },
  },
}

export default resolvers
