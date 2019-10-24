export type Id = number

export interface Entity<T extends string | number> {
  id: T
}
