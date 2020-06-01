import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import connectMongoose from '../../config/mongoose'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import UsersDataSource from './usersDataSource'
import User from './models/User'

const PORT = process.env.USERS_SERVICE_PORT
const nameDB = process.env.USERS_MONGODB_NAME

connectMongoose(nameDB)

const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    usersAPI: new UsersDataSource(User),
  }),
})

server.applyMiddleware({ app })

app.listen({ port: PORT }, () => {
  console.log(`Users service 🚀 ready at ${PORT} `)
})
