import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import connectMongoose from '../../config/mongoose'
import resolvers from './resolvers'
import typeDefs from './typeDefs'

const PORT = process.env.PLANNINGS_SERVICE_PORT
const nameDB = process.env.PLANNINGS_MONGODB_NAME

connectMongoose(nameDB)

const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.applyMiddleware({ app })

app.listen({ port: PORT }, () => {
  console.log(`Plannings service 🚀 ready at ${PORT} `)
})
