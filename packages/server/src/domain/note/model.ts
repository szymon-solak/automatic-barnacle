import { Id, Entity } from '../entity'
import { boundType } from '../../types/bound-type'
import { TrackId } from '../track/model'

export type NoteId = boundType<Id, 'NoteId'>

export interface Note extends Entity<NoteId> {
  trackId: TrackId
  text: string
}
