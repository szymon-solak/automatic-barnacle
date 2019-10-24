import { ConsoleLogger } from './infrastructure/logger'
import { PoolDatabaseConnection } from './infrastructure/db'
import { UserRepository } from './infrastructure/repositories/user/repository'

const logger = new ConsoleLogger()
const dbPool = new PoolDatabaseConnection(logger)

export const run = async () => {
  dbPool.connect()

  const userRepository = new UserRepository(dbPool)

  const newUser = await userRepository.create('John Doe')

  newUser.map(u => {
    console.log(u)
  })

  const newUserFromDB = await userRepository.getById(7 as any)

  newUserFromDB.map(u => {
    console.log('get', u)
  })

  const now = await dbPool.query<{ now: string }>('select now()')

  now.map(n => {
    console.log(n)
    return n
  })

  await dbPool.disconnect()
}
