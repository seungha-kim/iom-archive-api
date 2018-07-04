import { createConnection, getCustomRepository, getRepository } from 'typeorm'
import { MainRepository } from './tasks'

let conn

beforeAll(async () => {
  conn = await createConnection()
  await conn.dropDatabase()
  await conn.synchronize()
})

afterAll(async () => {
  await conn.dropDatabase()
  await conn.close()
})

describe('PostRepository', () => {
  test('createPost with fresh relations', async () => {
    const repo = getCustomRepository(MainRepository)
    const post = await repo.createPost({
      title: 'haha',
      description: 'hahahaha',
      resources: [
        {
          name: 'haha',
          resourceUrl: 'hahaha',
        },
      ],
      category: {
        name: 'Food',
      },
      tags: [
        {
          name: 'Hello',
        },
      ],
    })
    expect(post.title).toBe('haha')
    expect(post.description).toBe('hahahaha')
    expect(post.resources[0].name).toBe('haha')
    expect(post.category.name).toBe('Food')
    expect(post.tags.length).toBe(1)
  })
})
