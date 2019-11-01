import { ApolloServer } from 'apollo-server'

import { ConsoleLogger } from './infrastructure/logger'
import { PoolDatabaseConnection } from './infrastructure/db'

import { typeDefs, resolvers } from './gateway'
import { UserRepository } from './infrastructure/repositories'

export const run = async () => {
  const logger = new ConsoleLogger()
  const db = new PoolDatabaseConnection(logger)

  db.connect()

  const userRepository = new UserRepository(db, logger)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
      return {
        userRepository,
      }
    },
  })

  server.listen().then(({ url }) => {
    logger.info(`🚀 Server ready at ${url}`)
  })
}
