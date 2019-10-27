type TypeMap<U extends { type: string | number | symbol }> = {
  [K in U['type']]: U extends { type: K } ? U : never
}
type Pattern<TOptions extends { type: string | number | symbol }, TResult> = {
  [K in keyof TypeMap<TOptions>]: (value: TypeMap<TOptions>[K]) => TResult
}

export const match = <
  TOptions extends { type: string | number },
  TResult = void
>(
    option: TOptions,
    pattern: Pattern<TOptions, TResult>
  ): TResult => {
  // @ts-ignore - https://github.com/microsoft/TypeScript/issues/13573
  return pattern[option.type](option)
}
