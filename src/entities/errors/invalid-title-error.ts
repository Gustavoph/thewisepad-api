export class InvalidTitleError extends Error {
  constructor (title: string) {
    super('Invalid Title')
    this.name = 'InvalidTitleError'
  }
}
