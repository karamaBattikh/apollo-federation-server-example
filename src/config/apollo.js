import { ApolloServer } from 'apollo-server-express'
import { ApolloGateway } from '@apollo/gateway'

const gateway = new ApolloGateway({
  serviceList: [
    {
      name: 'users',
      url: `http://localhost:${process.env.USERS_SERVICE_PORT}`,
    },
    {
      name: 'internships',
      url: `http://localhost:${process.env.INTERNSHIPS_SERVICE_PORT}`,
    },
    {
      name: 'plannings',
      url: `http://localhost:${process.env.PLANNINGS_SERVICE_PORT}`,
    },
    {
      name: 'candidates',
      url: `http://localhost:${process.env.CANDIDATE_SERVICE_PORT}`,
    },
  ],
})

const server = new ApolloServer({
  gateway,
  subscriptions: false,
})

export default server
