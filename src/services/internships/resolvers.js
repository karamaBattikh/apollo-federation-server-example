const resolvers = {
  Internship: {
    __resolveReference: (reference, { dataSources }) => {
      return dataSources.internshipsAPI.getInternshipByID(reference.id)
    },
  },
  Query: {
    internships: async (_, args, { dataSources }) => {
      return dataSources.internshipsAPI.getAllInternships()
    },
    internship: async (_, { id }, { dataSources }) => {
      return dataSources.internshipsAPI.getInternshipByID(id)
    },
  },
  Mutation: {
    createInternship: async (_, { input }, { dataSources }) => {
      return dataSources.internshipsAPI.createInternship(input)
    },
    updateInternship: async (_, { id, input }, { dataSources }) => {
      return dataSources.internshipsAPI.updateInternship(id, input)
    },
    deleteInternship: async (_, { id }, { dataSources }) => {
      return dataSources.internshipsAPI.deleteInternship(id)
    },
  },
}

export default resolvers
