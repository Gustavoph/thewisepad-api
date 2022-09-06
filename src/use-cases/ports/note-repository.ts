import { NoteData } from './note-data'

export interface NoteRepository {
  remove: (noteId: string) => Promise<void>
  add: (noteData: NoteData) => Promise<NoteData>
  findById: (noteId: string) => Promise<NoteData>

  findAllNotesFrom: (userId: string) => Promise<NoteData[]>
  updateTitle: (noteId: string, newTitle: string) => Promise<void>
  updateContent: (noteId: string, newContent: string) => Promise<void>
}
