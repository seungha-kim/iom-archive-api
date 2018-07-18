import { createConnection } from 'typeorm'
import CategoryRepository from './CategoryRepository'
import { withTx } from './testUtil'

let conn

beforeAll(async () => {
  conn = await createConnection()
})

afterAll(async () => {
  await conn.close()
})

describe('CategoryRepository', () => {
  test(
    'can create category',
    withTx(async manager => {
      const repo = manager.getCustomRepository(CategoryRepository)
      const ct = await repo.createCategory('my category')
      expect(ct.id).not.toBeUndefined()
      expect(ct.name).toBe('my category')
    })
  )
})
