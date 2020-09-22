const resolvers = {
  Query: {
    candidates: async (_, arg, { dataSources }) => {
      return dataSources.candidatesAPI.getAllCandidate()
    },
    candidate: async (_, { id }, { dataSources }) => {
      return dataSources.candidatesAPI.getCandidateByID(id)
    },
  },
  Mutation: {
    createCandidate: async (_, { input }, { dataSources }) => {
      return dataSources.candidatesAPI.createCandidate(input)
    },
    updateCandidate: async (_, { id, input }, { dataSources }) => {
      return dataSources.candidatesAPI.updateCandidate(id, input)
    },
    deleteCandidate: async (_, { id }, { dataSources }) => {
      return dataSources.candidatesAPI.deleteCandidate(id)
    },
  },
}

export default resolvers
