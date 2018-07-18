import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Post from './Post'

@Entity()
export default class Category {
  @PrimaryGeneratedColumn() public id: number

  @Column() public name: string

  @OneToMany(type => Post, post => post.category)
  public posts: Post[]
}
