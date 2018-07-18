import { EntityRepository, Repository } from 'typeorm'
import User from '../entity/User'

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public async createUser(username: string, password: string) {
    const user = this.manager.create(User, {
      username,
      password,
    })
    return this.manager.save(user)
  }
}
