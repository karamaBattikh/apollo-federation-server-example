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
  },
}
export default resolvers
