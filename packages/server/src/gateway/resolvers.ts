export const resolvers = {
  Query: {
    test: () => 'Hello World!',
    currentUser: () => ({
      displayName: 'John Doe',
      onboarded: false,
    }),
  },
}
