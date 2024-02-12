import mongoose from 'mongoose'
import env from './env.js'

// Build the connection string
const dbURI = `mongodb://${env.db.user}:${encodeURIComponent(
  env.db.password
)}@${env.db.host}:${env.db.port}/${env.db.name}`

const options = {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
  autoIndex: true,
  // poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  // bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
}

mongoose.set('debug', env.env === 'development')

// Create the database connection
mongoose.connect(dbURI, options).catch(e => {
  console.info('Mongoose default connection open to ' + dbURI)
  console.error(e)
})

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  if (env.isDev) {
    console.log('Connecting to MongoDB in env: ' + env.env)
    console.info('Mongoose default connection open to ' + dbURI)
  }
})

// If the connection throws an error
mongoose.connection.on('error', err => {
  if (env.isDev) {
    console.error('Mongoose default connection error: ' + err)
    console.error('connection url: ' + dbURI)
  }
})

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.info('Mongoose default connection disconnected')
})

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.info(
      'Mongoose default connection disconnected through app termination'
    )
    process.exit(0)
  })
})
