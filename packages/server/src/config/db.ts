import { Pool } from 'pg'

import { Logger } from './logger'
import { Option } from '../types/option'

export interface DatabaseConnection {
  connect: () => void
  disconnect: () => void
  query: <TResult>(query: string, params?: string[]) => Promise<Option<TResult[]>>
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

  public async query <TResult>(query: string, params: string[] = []): Promise<Option<TResult[]>> {
    if (!this.pool) {
      this.logger.error(
        '[DB]: Query error - no open pool. Make sure you are connected to the database before trying to run `query`'
      )
      return Option.of<TResult[]>(null)
    }

    const result = await this.pool.query<TResult>(query, params)

    return Option.of(result.rows)
  }
}

