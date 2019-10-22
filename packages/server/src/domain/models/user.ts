import { Id, Entity } from './Entity'
import { boundType } from '../../types/bound-type'
import { Option } from '../../types/option'

export type UserId = boundType<Id, 'UserId'>

export interface UserRow {
  id: Id
  displayName: string
  photoUrl?: string
}

export interface User extends Entity<UserId> {
  displayName: string
  photoUrl: Option<string>
}

const mapToUserId = (id: Id): UserId => {
  return (id as unknown) as UserId
}

export const mapUserToModel = (row: Option<UserRow>): Option<User> =>
  row.map(user => ({
    id: mapToUserId(user.id),
    displayName: user.displayName,
    photoUrl: Option.of(user.photoUrl),
  }))
