import { Id, Entity } from '../entity'
import { boundType } from '../../types/bound-type'
import { TrackId } from '../track/model'
import { String800 } from '../types'

export type NoteId = boundType<Id, 'NoteId'>

export interface Note extends Entity<NoteId> {
  trackId: TrackId
  text: String800
}
