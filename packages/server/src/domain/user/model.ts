import { Id, Entity } from '../entity'
import { boundType } from '../../types/bound-type'
import { Option } from '../../types/option'
import { String255 } from '../types'

export type UserId = boundType<Id, 'UserId'>

export interface User extends Entity<UserId> {
  displayName: String255
  photoUrl: Option<String255>
  onboarded: boolean
}
