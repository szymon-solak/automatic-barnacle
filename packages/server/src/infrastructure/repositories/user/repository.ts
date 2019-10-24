import { DatabaseConnection } from '../../db'
import { UserId } from '../../../domain/models/user/model'
import { UserRow, mapUserRowToModel } from './mapping'

export class UserRepository {
  constructor(private readonly databaseConnection: DatabaseConnection) {}

  public async create(displayName: string, photoUrl?: string) {
    const result = await this.databaseConnection.query<UserRow>(
      'INSERT INTO app_user (display_name, photo_url) VALUES ($1, $2) RETURNING *',
      [displayName, photoUrl]
    )

    const user = result.map(u => u[0])

    return mapUserRowToModel(user)
  }

  public async getById(id: UserId) {
    const result = await this.databaseConnection.query<UserRow>(
      'SELECT * FROM app_user WHERE user_id = $1',
      [id.toString()]
    )

    const user = result.map(u => u[0])

    return mapUserRowToModel(user)
  }
}
