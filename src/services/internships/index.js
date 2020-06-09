import { ApolloServer } from 'apollo-server'
import { buildFederatedSchema } from '@apollo/federation'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import connectMongoose from '../../config/mongoose'
import Internship from './models/intership'
import InternshipsDataSource from './internshipsDataSource'

const PORT = process.env.INTERNSHIPS_SERVICE_PORT
const nameDB = process.env.INTERNSHIPS_MONGODB_NAME

connectMongoose(nameDB)

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  dataSources: () => ({
    internshipsAPI: new InternshipsDataSource(Internship),
  }),
})

server.listen({ port: PORT }, () => {
  console.log(`Internships service 🚀 ready at ${PORT} `)
})
