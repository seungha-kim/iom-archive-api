import { gql } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import { getCustomRepository } from 'typeorm'
import PostRepository from '../repository/PostRepository'
import UserRepository from '../repository/UserRepository'

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
      const repo = getCustomRepository(UserRepository)
      return repo.createUser(username, password)
    },
    async createPost(root: any, args: any) {
      const { post } = args
      const repo = getCustomRepository(PostRepository)
      return repo.createPost(post)
    },
  },
  Query: {
    hello: () => 'world',
    // user(root: any, args: any) {
    //   const { id } = args
    //   return getRepository(User).findOne(id)
    // },
    post(root: any, args: any) {
      const { id } = args
      return getCustomRepository(PostRepository).findOne(id)
    },
  },
}

export default makeExecutableSchema({
  typeDefs,
  resolvers,
})
