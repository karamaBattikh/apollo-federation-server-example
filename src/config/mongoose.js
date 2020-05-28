import mongoose from 'mongoose'

const connectMongoose = (nameDB) => {
  const connectionUrl = `${process.env.MONGODB_URL}/${nameDB}`

  mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })

  mongoose.connection.on('connected', () => {
    console.log(`Mongoose default connection ready at ${connectionUrl}`)
  })

  mongoose.connection.on('error', (error) => {
    console.log('Mongoose default connection error:', error)
  })
}

export default connectMongoose
