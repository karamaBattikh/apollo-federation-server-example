import { ApolloServer } from 'apollo-server'
import { buildFederatedSchema } from '@apollo/federation'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import connectMongoose from '../../config/mongoose'
import Company from './models/company'
import CompanysDataSource from './companysDataSource'

const PORT = process.env.COMPANYS_SERVICE_PORT
const nameDB = process.env.COMPANYS_MONGODB_NAME

connectMongoose(nameDB)

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  dataSources: () => ({
    companysAPI: new CompanysDataSource(Company),
  }),
})

server.listen({ port: PORT }, () => {
  console.log(`Companys service 🚀 ready at ${PORT} `)
})
