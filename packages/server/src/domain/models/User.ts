import { Entity, Id } from './Entity'
import { boundType } from '../../types/bound-type'
import { Option } from '../../types/option'

export type UserId = boundType<Id, 'UserId'>

export class User extends Entity<UserId> {
  public displayName: string
  public photoUrl: Option<string>
}
