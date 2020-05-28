import { ApolloServer } from 'apollo-server-express'
import resolvers from './resolvers'
import typeDefs from './typeDefs'

const port = process.env.USERS_SERVICE_PORT

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen(port, () => {
  console.log(`Users service ready at ${port}`)
})
