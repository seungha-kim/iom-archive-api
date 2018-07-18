import { createConnection } from 'typeorm'
import CategoryRepository from './CategoryRepository'
import PostRepository from './PostRepository'
import { withTx } from './testUtil'

let conn

beforeAll(async () => {
  conn = await createConnection()
})

afterAll(async () => {
  await conn.close()
})

describe('PostRepository', () => {
  test(
    'can create post with fresh relations',
    withTx(async manager => {
      const repo = manager.getCustomRepository(PostRepository)
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
      const newPost = await repo.findOne(post.id)
      expect(newPost.title).toBe('haha')
      const posts = await repo.find()
      expect(posts.length).toBe(1)
    })
  )

  test(
    'can create post with existing category',
    withTx(async manager => {
      const categoryRepo = manager.getCustomRepository(CategoryRepository)
      const category = await categoryRepo.createCategory('my category')
      const postRepo = manager.getCustomRepository(PostRepository)
      const post = await postRepo.createPost({
        title: 'haha',
        description: 'hahahaha',
        resources: [
          {
            name: 'haha',
            resourceUrl: 'hahaha',
          },
        ],
        category: {
          id: category.id,
        },
        tags: [
          {
            name: 'Hello',
          },
        ],
      })
      expect(post.category.id).toBe(category.id)
    })
  )
})
