const resolvers = {
  UserResult: {
    __resolveType: (objet) => {
      if (objet.id) {
        return 'User'
      }
      if (objet.errors) {
        return 'ErrorsMessage'
      }
      if (objet.message) {
        return 'SuccessMessage'
      }
      return null
    },
  },
  Query: {
    users: async (_, arg, { dataSources }) => {
      return dataSources.usersAPI.getAllUser()
    },
    user: async (_, { id }, { dataSources }) => {
      return dataSources.usersAPI.getUserByID(id)
    },
  },
  Mutation: {
    createUser: async (_, { input }, { dataSources }) => {
      return dataSources.usersAPI.createUser(input)
    },
    updateUser: async (_, { id, input }, { dataSources }) => {
      return dataSources.usersAPI.updateUser(id, input)
    },
    deleteUser: async (_, { id }, { dataSources }) => {
      return dataSources.usersAPI.deleteUser(id)
    },
  },
}
export default resolvers
