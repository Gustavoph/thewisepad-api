import { NoteData, NoteRepository, UseCase } from '@/use-cases/ports'

export class LoadNotes implements UseCase {
  constructor (private readonly noteRepository: NoteRepository) {
    this.noteRepository = noteRepository
  }

  public async perform (requestUserId: string): Promise<NoteData[]> {
    return await this.noteRepository.findAllNotesFrom(requestUserId)
  }
}
