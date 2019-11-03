import { ApolloServer, AuthenticationError } from 'apollo-server'

import { ConsoleLogger } from './infrastructure/logger'
import { PoolDatabaseConnection } from './infrastructure/db'
import { UserRepository } from './infrastructure/repositories'
import {
  GoogleAuthenticator,
  createRequestValidator,
} from './infrastructure/auth'

import { typeDefs, resolvers } from './gateway'

import { config } from './config'

export const run = async () => {
  const logger = new ConsoleLogger()
  const db = new PoolDatabaseConnection(logger)
  const googleAuth = new GoogleAuthenticator(config.auth.google.clientId)
  const validateRequest = createRequestValidator(googleAuth)

  db.connect()

  const userRepository = new UserRepository(db, logger)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      try {
        const { userId } = await validateRequest(req)

        const dependencies = {
          currentUserId: userId,
          repositories: {
            userRepository,
          },
        }

        return dependencies
      } catch (error) {
        throw new AuthenticationError(error)
      }
    },
  })

  server.listen().then(({ url }) => {
    logger.info(`🚀 Server ready at ${url}`)
  })
}
