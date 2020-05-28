import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'

const PORT = process.env.INTERNSHIPS_SERVICE_PORT

const app = express()

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.applyMiddleware({ app })

app.listen({ port: PORT }, () => {
  console.log(`Internships service 🚀 ready at ${PORT} `)
})
