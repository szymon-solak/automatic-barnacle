import { ConsoleLogger } from './logger'
import { connect } from './db'

const logger = new ConsoleLogger()
const dbPool = connect({
  logger,
})


export const run = async () => {
  const now = await dbPool.query('select now()')
  console.log(dbPool)

  logger.info(now)

  await dbPool.end()
}

