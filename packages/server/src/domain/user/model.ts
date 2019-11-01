import { Id, Entity } from '../entity'
import { boundType } from '../../types/bound-type'
import { Option } from '../../types/option'

export type UserId = boundType<Id, 'UserId'>

export interface User extends Entity<UserId> {
  displayName: string
  photoUrl: Option<string>
}
