import { Id, Entity } from '../entity'
import { boundType } from '../../types/bound-type'
import { String255 } from '../types'

export type ScoreId = boundType<Id, 'ScoreId'>

export type ScoreValue = 1 | 2 | 3

export interface Score extends Entity<ScoreId> {
  value: ScoreValue
  label: String255
}
