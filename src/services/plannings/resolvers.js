const resolvers = {
  Planning: {
    __resolveReference: (reference, { dataSources }) => {
      const ref = dataSources.planningsAPI.getPlanningByID(reference.id)
      return ref
    },
    candidate: (planning) => {
      return { __typename: 'Candidate', id: planning.candidate }
    },
  },
  Query: {
    plannings: (_, arg, { dataSources }) => {
      return dataSources.planningsAPI.getAllPlannings()
    },
    planning: async (_, { id }, { dataSources }) => {
      const data = await dataSources.planningsAPI.getPlanningByID(id)
      return data
    },
  },
  Mutation: {
    createPlanning: async (_, { input }, { dataSources }) => {
      return dataSources.planningsAPI.createPlanning(input)
    },
    updatePlanning: async (_, { id, input }, { dataSources }) => {
      return dataSources.planningsAPI.updatePlanning(id, input)
    },
    deletePlanning: async (_, { id }, { dataSources }) => {
      return dataSources.planningsAPI.deletePlanning(id)
    },
  },
}

export default resolvers
