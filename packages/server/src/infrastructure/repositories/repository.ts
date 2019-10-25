import { DatabaseConnection } from '../db'
import { Logger } from '../logger'
import { match } from '../../utils/match'

export class Repository {
  constructor(
    private readonly connection: DatabaseConnection,
    private readonly logger: Logger
  ) {}

  protected async query<TResult>(
    query: string,
    params: Array<string | number | undefined>
  ) {
    const result = await this.connection.query<TResult>(query, params)

    const unpacked = result.getOrElse(error => {
      const errorMessage = match(error, {
        QueryError: ({ name, message }) => `${name}: ${message}`,
        DatabaseError: ({ name, message }) => `${name}: ${message}`,
      })

      this.logger.error(errorMessage)

      return []
    })

    return unpacked
  }
}
