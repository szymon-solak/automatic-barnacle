export abstract class Option<T> {
  public static of<T = {}>(value?: null | undefined): None<T>
  public static of<T>(value?: T): Some<T>
  public static of<T>(value?: T | null | undefined): Option<T> {
    return value == null ? new None<T>() : new Some<T>(value)
  }

  public abstract getOrElse<TDefault>(def: TDefault): T | TDefault
  public abstract map<U>(transform: (value: T) => U): Option<U>
}

export class Some<T> extends Option<T> {
  constructor(private readonly value: T) {
    super()
  }

  public getOrElse<TDefault>(def: TDefault): T | TDefault {
    const isNullOrNaN =
      this.value == null ||
      (typeof this.value === 'number' && isNaN(this.value))

    return isNullOrNaN ? def : this.value
  }

  public map<U>(transform: (value: T) => U): Some<U> {
    return new Some(transform(this.value))
  }
}

export class None<T> extends Option<T> {
  public getOrElse<TDefault>(def: TDefault) {
    return def
  }

  public map<U>(_: (value: T) => U): None<U> {
    return new None<U>()
  }
}
