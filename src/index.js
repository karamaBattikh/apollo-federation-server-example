import express from 'express'

const port = process.env.PORT || 4000

const app = express()

app.listen(port, () => {
  console.log(`Server ready at http://localhost:${port}`)
})
