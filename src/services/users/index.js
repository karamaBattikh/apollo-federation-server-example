import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import connectMongoose from '../../config/mongoose'
import typeDefs from './typeDefs'
import resolvers from './resolvers'

const PORT = process.env.USERS_SERVICE_PORT
const nameDB = process.env.USERS_MONGODB_NAME

connectMongoose(nameDB)

const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.applyMiddleware({ app })

app.listen({ port: PORT }, () => {
  console.log(`Users service 🚀 ready at ${PORT} `)
})
