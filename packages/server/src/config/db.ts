import { Pool } from 'pg'

import { Logger } from './logger'

export interface DatabaseConnection {
  connect: () => void
  disconnect: () => void
  query: <TResult>(query: string, params: string[]) => Promise<TResult[]>
}

export class PoolDatabaseConnection implements DatabaseConnection {
  private pool: Pool | null = null;

  constructor (
    private readonly logger: Logger,
  ) {}

  public connect () {
    if (this.pool !== null) return

    this.pool = new Pool() 

    this.pool.on('error', (err) => {
      this.logger.error(err.message)
    })
  }

  public async disconnect () {
    if (this.pool === null) return

    return this.pool.end()
  }

  public async query <TResult>(query, params) {
    if (!this.pool) {
      this.logger.error('[DB]: Query error - no open pool. Make sure you are connected to the db beofre trying to run `query`')
      return
    }

    const result = await this.pool.query<TResult>(query, params)

    return result.rows
  }
}

