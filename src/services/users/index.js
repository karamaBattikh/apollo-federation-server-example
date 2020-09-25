import { ApolloServer } from 'apollo-server'
import { buildFederatedSchema } from '@apollo/federation'
import connectMongoose from '../../config/mongoose'
import initDeleteUserQueue from './queues'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import UsersDataSource from './usersDataSource'
import User from './models/User'

const PORT = process.env.USERS_SERVICE_PORT
const nameDB = process.env.USERS_MONGODB_NAME

connectMongoose(nameDB)

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  dataSources: () => ({
    usersAPI: new UsersDataSource(User),
  }),
  context: async () => {
    const deleteUserQueue = await initDeleteUserQueue()
    return { queues: { deleteUserQueue } }
  },
})

server.listen({ port: PORT }, () => {
  console.log(`Users service 🚀 ready at ${PORT} `)
})
