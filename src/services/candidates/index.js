import { ApolloServer } from 'apollo-server'
import { buildFederatedSchema } from '@apollo/federation'
import connectMongoose from '../../config/mongoose'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import CandidatesDataSource from './CandidatesDataSource'
import Candidate from './models/Candidate'

const PORT = process.env.CANDIDATES_SERVICE_PORT
const nameDB = process.env.CANDIDATES_MONGODB_NAME

connectMongoose(nameDB)

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  dataSources: () => ({
    candidatesAPI: new CandidatesDataSource(Candidate),
  }),
})

server.listen({ port: PORT }, () => {
  console.log(`Candidates service 🚀 ready at ${PORT} `)
})
