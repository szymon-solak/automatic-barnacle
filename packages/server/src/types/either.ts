export abstract class Either<E, A> {
  public static left<E, A>(error: E) {
    return new Left<E, A>(error)
  }

  public static right<E, A>(value: A) {
    return new Right<E, A>(value)
  }

  public abstract getOrElse(handleError: (error: E) => A): A
  public abstract map<T>(transform: (val: A) => T): Either<E, T>
}

export class Left<E, A> extends Either<E, A> {
  constructor(private readonly error: E) {
    super()
  }

  public getOrElse(handleError: (error: E) => A) {
    return handleError(this.error)
  }

  public map<T>(_transform: (val: A) => T) {
    return new Left<E, T>(this.error)
  }
}

export class Right<E, A> extends Either<E, A> {
  constructor(private readonly value: A) {
    super()
  }

  public getOrElse(_handleError: (error: E) => A) {
    return this.value
  }

  public map<T>(transform: (val: A) => T) {
    return new Right<E, T>(transform(this.value))
  }
}
