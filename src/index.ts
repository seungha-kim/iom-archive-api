import { ApolloServer, gql } from 'apollo-server-express'
import * as express from 'express'
import { createConnection } from 'typeorm'
import { resolvers, typeDefs } from './schema'

const PORT = 3030
const app = express()
const server = new ApolloServer({
  resolvers,
  typeDefs,
})

server.applyMiddleware({ app })

async function init() {
  await createConnection()
  app.listen({ port: PORT }, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
    )
  })
}

init()
