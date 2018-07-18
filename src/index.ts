import { createConnection } from 'typeorm'
import { app, server } from './server'

const PORT = process.env.PORT || 3030

async function init() {
  await createConnection()
  app.listen({ port: PORT }, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  })
}

init()
