import { ApolloServer, gql } from 'apollo-server-express'
import * as express from 'express'
import { createConnection } from 'typeorm'
import schema from '../schema'

const app = express()
const server = new ApolloServer({
  schema,
})

server.applyMiddleware({ app })

export { app, server }
