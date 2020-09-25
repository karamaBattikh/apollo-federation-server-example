import { ApolloServer } from 'apollo-server'
import { buildFederatedSchema } from '@apollo/federation'
import connectMongoose from '../../config/mongoose'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import UsersDataSource from './usersDataSource'
import User from './models/User'
import {
  initDeleteUserQueue,
  initDeleteCandidateQueue,
  onDeleteCandidate,
} from './queues'

const PORT = process.env.USERS_SERVICE_PORT
const nameDB = process.env.USERS_MONGODB_NAME

;(async () => {
  connectMongoose(nameDB)

  const deleteUserQueue = await initDeleteUserQueue()
  const deleteCandidateQueue = await initDeleteCandidateQueue()

  deleteCandidateQueue.listen(
    { interval: 5000, maxReceivedCount: 5 },
    (payload) => onDeleteCandidate(payload),
  )

  const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
    dataSources: () => ({
      usersAPI: new UsersDataSource(User),
    }),
    context: async () => ({
      queues: { deleteUserQueue },
    }),
  })

  server.listen({ port: PORT }, () => {
    console.log(`Users service 🚀 ready at ${PORT} `)
  })
})()
