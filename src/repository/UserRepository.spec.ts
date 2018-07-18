import { createConnection } from 'typeorm'
import { withTx } from './testUtil'
import UserRepository from './UserRepository'

let conn

beforeAll(async () => {
  conn = await createConnection()
})

afterAll(async () => {
  await conn.close()
})

describe('UserRepository', () => {
  test(
    'create user',
    withTx(async manager => {
      const repo = manager.getCustomRepository(UserRepository)
      const user = await repo.createUser('hello', 'world')
      expect(user.username).toBe('hello')
      expect(user.password).toBe('world')
    })
  )
})
