import { Pool } from 'pg'

import { Logger } from './logger'
import { Either } from '../types/either'
import { QueryError, DatabaseError } from './errors'

export interface DatabaseConnection {
  connect: () => void
  disconnect: () => void
  query: <TResult>(
    query: string,
    params?: Array<string | number | undefined>
  ) => Promise<Either<QueryError | DatabaseError, TResult[]>>
}

export class PoolDatabaseConnection implements DatabaseConnection {
  private pool: Pool | null = null

  constructor(private readonly logger: Logger) {}

  public connect() {
    if (this.pool !== null) return

    this.pool = new Pool()

    this.pool.on('error', err => {
      this.logger.error(err.message)
    })
  }

  public async disconnect() {
    if (this.pool === null) return

    await this.pool.end()

    this.pool = null
  }

  public async query<TResult>(
    query: string,
    params: Array<string | number | undefined> = []
  ): Promise<Either<QueryError | DatabaseError, TResult[]>> {
    if (!this.pool) {
      return Either.left(
        new DatabaseError(
          'The connection pool is not open. Make sure you are connected to the database before trying to running the query'
        )
      )
    }

    try {
      const result = await this.pool.query<TResult>(query, params)
      return Either.right(result.rows)
    } catch (error) {
      return Either.left(new QueryError(error))
    }
  }
}
