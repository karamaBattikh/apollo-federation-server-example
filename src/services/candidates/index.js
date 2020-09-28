/* eslint-disable prettier/prettier */
import { ApolloServer } from 'apollo-server'
import { buildFederatedSchema } from '@apollo/federation'
import connectMongoose from '../../config/mongoose'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import CandidatesDataSource from './CandidatesDataSource'
import Candidate from './models/Candidate'
import {
  initDeleteUserQueue,
  initDeleteInternshipQueue,
  onDeleteUser,
  onDeleteInternship,
} from './queues'

const PORT = process.env.CANDIDATES_SERVICE_PORT
const nameDB = process.env.CANDIDATES_MONGODB_NAME

;(async () => {
  connectMongoose(nameDB)

  const deleteUserQueue = await initDeleteUserQueue()
  const deleteInternshipQueue = await initDeleteInternshipQueue()

  deleteUserQueue.listen({ interval: 5000, maxReceivedCount: 5 }, (payload) => {
    onDeleteUser(payload)
  })

  deleteInternshipQueue.listen(
    { interval: 5000, maxReceivedCount: 5 },
    (payload) => {
      onDeleteInternship(payload)
    },
  )

  const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
    dataSources: () => ({
      candidatesAPI: new CandidatesDataSource(Candidate),
    }),
  })

  server.listen({ port: PORT }, () => {
    console.log(`Candidates service 🚀 ready at ${PORT} `)
  })
})()
