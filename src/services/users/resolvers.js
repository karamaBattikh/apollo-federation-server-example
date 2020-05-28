import User from './models/User'

const resolvers = {
  Query: {
    users: async () => {
      const list = await User.find({})
      return list
    },
    user: async (_, { id }) => {
      const user = await User.findById(id)
      return user
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const newUser = User(input)
      const result = await newUser.save()
      if (!result) return { messsage: 'err' }
      return newUser
    },
    updateUser: async (_, { id, input }) => {
      const result = await User.findByIdAndUpdate(id, input)
      if (!result) return { messsage: 'err' }
      return result
    },
    deleteUser: async (_, { id }) => {
      const user = await User.findById(id)
      if (!user) return 'User Not Found !'
      await User.findByIdAndDelete(id)
      return 'The user was deleted successfully'
    },
  },
}
export default resolvers
