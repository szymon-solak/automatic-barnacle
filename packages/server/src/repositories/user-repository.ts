import { DatabaseConnection } from '../config/db'
import { UserId, UserRow, mapUserToModel } from '../domain/models/user'

export class UserRepository {
  constructor(private readonly databaseConnection: DatabaseConnection) {}

  public async getById(id: UserId) {
    const result = await this.databaseConnection.query<UserRow>(
      'SELECT FROM users WHERE id = $1',
      [id.toString()]
    )

    const user = result.map(x => x[0])

    return mapUserToModel(user)
  }
}
