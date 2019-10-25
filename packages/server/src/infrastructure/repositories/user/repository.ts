import { UserId } from '../../../domain/user/model'
import { UserRow, mapUserRowToModel } from './mapping'
import { Repository } from '../repository'
import { Option } from '../../../types/option'

export class UserRepository extends Repository {
  public async create(displayName: string, photoUrl?: string) {
    const result = await this.query<UserRow>(
      'INSERT INTO app_user (display_name, photo_url) VALUES ($1, $2) RETURNING *',
      [displayName, photoUrl]
    )

    const user = Option.of(result[0])

    return mapUserRowToModel(user)
  }

  public async getById(id: UserId) {
    const result = await this.query<UserRow>(
      'SELECT * FROM app_user WHERE user_id = $1',
      [id.toString()]
    )

    const user = Option.of(result[0])

    return mapUserRowToModel(user)
  }
}
