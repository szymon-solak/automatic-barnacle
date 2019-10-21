import { DatabaseConnection } from '../config/db'

export class UserRepository {
  constructor(private readonly databaseConnection: DatabaseConnection) {}
}
