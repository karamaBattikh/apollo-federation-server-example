/* eslint-disable no-underscore-dangle */

const resolvers = {
  Internship: {
    __resolveReference(reference, { dataSources }) {
      return dataSources.internshipsAPI.getInternshipByID(reference.id)
    },
  },
  User: {
    async internshipsParticipated(user, args, { dataSources }) {
      const list = await dataSources.internshipsAPI.getInternshipByCandidate(
        user.id,
      )
      return list
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
