export type Id = number

export class Entity<T extends string | number> {
  public id: T
}
