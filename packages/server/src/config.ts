const required = (env: string) => {
  const value = process.env[env]

  if (!value) {
    throw new Error(`Missing env: ${env} is required!`)
  }

  return value
}

export const config = {
  auth: {
    google: {
      clientId: required('GOOGLE_CLIENT_ID'),
    },
  },
}
