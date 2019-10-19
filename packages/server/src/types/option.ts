export abstract class Option<T> {
  public static of <T = {}>(value?: null | undefined): None<T>
  public static of <T>(value: T): Some<T> 
  public static of <T>(value?: T | null | undefined): Option<T> {
    return value == null ? new None<T>() : new Some<T>()
  }

  public abstract getOrElse <TDefault>(def: TDefault): T | TDefault
  public abstract map <U>(transform: (value: T) => U): Option<U>
}

export class Some<T> extends Option<T> {

}

export class None<T> extends Option<T> {

}
