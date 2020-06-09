import express from 'express'
import server from './config/apollo'

const port = process.env.PORT || 4000

const app = express()

server.applyMiddleware({ app })

app.listen(port, () => {
  console.log(`Server ready at http://localhost:${port}`)
})
