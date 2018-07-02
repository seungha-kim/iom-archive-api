import {
  AbstractRepository,
  Column,
  Entity,
  EntityRepository,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Post } from './Post'

@Entity()
export class Category {
  @PrimaryGeneratedColumn() public id: number

  @Column() public name: string

  @OneToMany(type => Post, post => post.category)
  public posts: Post[]
}

@EntityRepository(Category)
export class CategoryRepository extends AbstractRepository<Category> {}
