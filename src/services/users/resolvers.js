import { find } from 'lodash'
import users from './mockData'

const resolvers = {
  Query: {
    users: () => {
      return users
    },
    user: (_, { id }) => {
      return find(users, (user) => user.id === id)
    },
  },
  Mutation: {},
}
export default resolvers
