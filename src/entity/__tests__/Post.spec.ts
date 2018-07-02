import { getCustomRepository, getRepository } from 'typeorm'
import { PostRepository } from '../Post'

describe('PostRepository', () => {
  test('createPost with fresh relations', () => {
    const repo = getCustomRepository(PostRepository)
    repo.createPost({
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
  })
})
