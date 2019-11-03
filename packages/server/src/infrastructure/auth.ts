import { OAuth2Client } from 'google-auth-library'
import { Either } from '../types/either'

export interface Authenticator {
  getIdFromToken: (token: string) => Promise<Either<Error, string>>
}

export class GoogleAuthenticator implements Authenticator {
  private readonly OAuthClient: OAuth2Client

  constructor(private readonly clientId: string) {
    const OAuthClient = new OAuth2Client(clientId)
    this.OAuthClient = OAuthClient
  }

  public async getIdFromToken(token: string): Promise<Either<Error, string>> {
    try {
      const userId = await this.extractUserId(token)

      if (!userId) {
        return Either.left(new Error('Auth error'))
      }

      return Either.right(userId)
    } catch (err) {
      return Either.left(new Error(err))
    }
  }

  private async extractUserId(token: string) {
    const ticket = await this.OAuthClient.verifyIdToken({
      idToken: token,
      audience: this.clientId,
    })

    const userId = ticket.getUserId()

    return userId
  }
}

export const createRequestValidator = (
  authStrategy: Authenticator
) => async (req: {
  headers: Record<string, string | string[] | undefined>
}) => {
  const authHeaders = req.headers.authorization
  const token = Array.isArray(authHeaders) ? authHeaders[0] : authHeaders

  if (!token) {
    throw new Error('Missing authorization token')
  }

  const authResult = await authStrategy.getIdFromToken(token)

  const userId = authResult.getOrElse(error => {
    throw new Error(error.message)
  })

  return { userId }
}
