import { gql } from 'apollo-server-express'
import { getRepository } from 'typeorm'
import { User } from '../entity/User'

export const typeDefs = gql`
  type Query {
    user(id: Int): User
    hello: String
  }

  type Mutation {
    createUser(username: String, password: String): User
  }

  type User {
    id: Int
    username: String
  }
`

export const resolvers = {
  Mutation: {
    async createUser(root, args) {
      const { username, password } = args
      const repo = getRepository(User)
      const user = repo.create({
        password,
        username,
      })
      return repo.save(user)
    },
  },
  Query: {
    hello: () => 'world',
    user(id: number) {
      return getRepository(User).findOne(id)
    },
  },
}
