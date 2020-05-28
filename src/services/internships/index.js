import { ApolloServer } from 'apollo-server-express'
import resolvers from './resolvers'
import typeDefs from './typeDefs'

const port = process.env.INTERNSHIPS_SERVICE_PORT

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen(port, () => {
  console.log(`Internships service ready at ${port}`)
})
