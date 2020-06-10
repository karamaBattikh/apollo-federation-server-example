const resolvers = {
  Query: {
    companys: async (_, args, { dataSources }) => {
      return dataSources.companysAPI.getAllCompanys()
    },
    company: async (_, { id }, { dataSources }) => {
      return dataSources.companysAPI.getCompanyByID(id)
    },
  },
  Mutation: {
    createCompany: async (_, { input }, { dataSources }) => {
      return dataSources.companysAPI.createCompany(input)
    },
    updateCompany: async (_, { id, input }, { dataSources }) => {
      return dataSources.companysAPI.updateCompany(id, input)
    },
    deleteCompany: async (_, { id }, { dataSources }) => {
      return dataSources.companysAPI.deleteCompany(id)
    },
  },
}

export default resolvers
