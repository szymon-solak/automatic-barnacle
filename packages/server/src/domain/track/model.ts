import { Id, Entity } from '../entity'
import { boundType } from '../../types/bound-type'
import { Score } from '../score/model'
import { Note } from '../note/model'

export type TrackId = boundType<Id, 'TrackId'>

export interface Track extends Entity<TrackId> {
  startDate: string
  endDate: string
  score: Score
  notes: Note[]
}
