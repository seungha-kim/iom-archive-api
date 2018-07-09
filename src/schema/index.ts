import { gql } from 'apollo-server-express'
import { getCustomRepository, getRepository } from 'typeorm'
import { Post } from '../entity/Post'
import { User } from '../entity/User'
import { MainRepository } from '../tasks'

export const typeDefs = gql`
  type Query {
    user(id: Int): User
    hello: String!
    post(id: Int): Post
  }

  type Mutation {
    createUser(username: String!, password: String!): User
    createPost(post: PostInput!): Post
  }

  type User {
    id: Int!
    username: String!
  }

  type Category {
    id: Int!
    name: String
  }

  input CategoryInput {
    id: Int
    name: String
  }

  type Resource {
    id: Int!
    name: String
    resourceUrl: String
  }

  input ResourceInput {
    id: Int
    name: String
    resourceUrl: String
  }

  type Tag {
    id: Int!
    name: String
  }

  input TagInput {
    id: Int
    name: String
  }

  input PostInput {
    title: String!
    description: String!
    category: CategoryInput!
    resources: [ResourceInput!]
    tags: [TagInput!]
  }

  type Post {
    id: Int!
    title: String!
    description: String!
    category: Category!
    resources: [Resource!]
    tags: [Tag!]
  }
`

export const resolvers = {
  Mutation: {
    async createUser(root: any, args: any) {
      const { username, password } = args
      const repo = getRepository(User)
      const user = repo.create({
        password,
        username,
      })
      return repo.save(user)
    },
    async createPost(root: any, args: any) {
      const { post } = args
      const repo = getCustomRepository(MainRepository)
      return repo.createPost(post)
    },
  },
  Query: {
    hello: () => 'world',
    user(root: any, args: any) {
      const { id } = args
      return getRepository(User).findOne(id)
    },
    post(root: any, args: any) {
      const { id } = args
      return getRepository(Post).findOne(id, {
        relations: ['category', 'resources', 'tags'],
      })
    },
  },
}
