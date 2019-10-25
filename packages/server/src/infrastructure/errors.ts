export class QueryError extends Error {
  public type = 'QueryError' as const

  constructor(message: string) {
    super(message)

    this.message = message
    this.name = this.type

    Object.setPrototypeOf(this, QueryError.prototype)
  }
}

export class DatabaseError extends Error {
  public type = 'DatabaseError' as const

  constructor(message: string) {
    super(message)

    this.message = message
    this.name = this.type

    Object.setPrototypeOf(this, QueryError.prototype)
  }
}
