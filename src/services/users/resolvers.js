const resolvers = {
  Query: {
    users: async (_, arg, { dataSource }) => {
      return dataSource.usersAPI.getAllUser()
    },
    user: async (_, { id }, { dataSource }) => {
      return dataSource.usersAPI.getUserByID(id)
    },
  },
  Mutation: {
    createUser: async (_, { input }, { dataSource }) => {
      return dataSource.usersAPI.createUser(input)
    },
    updateUser: async (_, { id, input }, { dataSource }) => {
      return dataSource.usersAPI.updateUser(id, input)
    },
    deleteUser: async (_, { id }, { dataSource }) => {
      return dataSource.usersAPI.deleteUser(id)
    },
  },
}
export default resolvers
