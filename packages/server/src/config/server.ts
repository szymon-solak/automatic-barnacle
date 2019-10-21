import { ConsoleLogger } from './logger'
import { PoolDatabaseConnection } from './db'

const logger = new ConsoleLogger()
const dbPool = new PoolDatabaseConnection(logger)

export const run = async () => {
  dbPool.connect()

  const now = await dbPool.query<{ now: string }>('select now()')

  now.map(n => {
    console.log(n)
    return n
  })

  await dbPool.disconnect()
}
