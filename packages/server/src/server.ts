import { ApolloServer } from 'apollo-server'

import { ConsoleLogger } from './infrastructure/logger'
import { PoolDatabaseConnection } from './infrastructure/db'

import typeDefs from './gateway/typeDefs.graphql'
import createResolvers from './gateway/createResolvers'

const logger = new ConsoleLogger()
const db = new PoolDatabaseConnection(logger)

export const run = async () => {
  db.connect()

  const resolvers = createResolvers()

  const server = new ApolloServer({ typeDefs, resolvers })

  server.listen().then(({ url }) => {
    logger.info(`Server ready at ${url}`)
  })
}
