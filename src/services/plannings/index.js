import { ApolloServer } from 'apollo-server'
import { buildFederatedSchema } from '@apollo/federation'
import connectMongoose from '../../config/mongoose'
import resolvers from './resolvers'
import typeDefs from './typeDefs'
import Planning from './models/planning'
import PlanningsDataSource from './planningsDataSource'

const PORT = process.env.PLANNINGS_SERVICE_PORT
const nameDB = process.env.PLANNINGS_MONGODB_NAME

connectMongoose(nameDB)

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  dataSources: () => ({
    planningsAPI: new PlanningsDataSource(Planning),
  }),
})

server.listen({ port: PORT }, () => {
  console.log(`Plannings service 🚀 ready at ${PORT} `)
})
