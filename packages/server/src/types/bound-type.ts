const boundField = Symbol()

export type boundType<K, T> = K & {
  [boundField]: T
}
