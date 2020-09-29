import { ApolloServer } from 'apollo-server'
import { buildFederatedSchema } from '@apollo/federation'
import connectMongoose from '../../config/mongoose'
import resolvers from './resolvers'
import typeDefs from './typeDefs'
import Planning from './models/planning'
import PlanningsDataSource from './planningsDataSource'
import { initDeleteCandidateQueue, onDeleteCandidate } from './queues'

const PORT = process.env.PLANNINGS_SERVICE_PORT
const nameDB = process.env.PLANNINGS_MONGODB_NAME

;(async () => {
  connectMongoose(nameDB)

  const deleteCandidateQueue = await initDeleteCandidateQueue()

  deleteCandidateQueue.listen(
    { interval: 5000, maxReceivedCount: 5 },
    (payload) => {
      onDeleteCandidate(payload)
    },
  )

  const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
    dataSources: () => ({
      planningsAPI: new PlanningsDataSource(Planning),
    }),
  })

  server.listen({ port: PORT }, () => {
    console.log(`Plannings service 🚀 ready at ${PORT} `)
  })
})()
