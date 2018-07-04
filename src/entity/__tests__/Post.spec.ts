import { createConnection, getCustomRepository, getRepository } from 'typeorm'
import { PostRepository } from '../Post'

describe('PostRepository', () => {
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

  test('createPost with fresh relations', async () => {
    const repo = getCustomRepository(PostRepository)
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
      tags: [],
    })
    expect(post.title).toBe('haha')
    expect(post.description).toBe('hahahaha')
    expect(post.resources[0].name).toBe('haha')
    expect(post.category.name).toBe('Food')
    expect(post.tags.length).toBe(0)
  })
})
