import { Id } from '../../../domain/entity'
import { UserId, User } from '../../../domain/user/model'
import { Option } from '../../../types/option'

export interface UserRow {
  user_id: Id
  display_name: string
  photo_url?: string
}

const mapToUserId = (id: Id): UserId => {
  return (id as unknown) as UserId
}

export const mapUserRowToModel = (row: Option<UserRow>): Option<User> =>
  row.map(user => ({
    id: mapToUserId(user.user_id),
    displayName: user.display_name,
    photoUrl: Option.of(user.photo_url),
  }))

export const mapUserModelToRow = (model: Option<User>): Option<UserRow> =>
  model.map(user => ({
    user_id: user.id,
    display_name: user.displayName,
    photo_url: user.photoUrl.getOrElse(undefined),
  }))
