import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import connectMongoose from '../../config/mongoose'

const PORT = process.env.INTERNSHIPS_SERVICE_PORT
const nameDB = process.env.INTERNSHIPS_MONGODB_NAME

connectMongoose(nameDB)

const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.applyMiddleware({ app })

app.listen({ port: PORT }, () => {
  console.log(`Internships service 🚀 ready at ${PORT} `)
})
