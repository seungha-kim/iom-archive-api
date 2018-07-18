import {
  AbstractRepository,
  Column,
  DeepPartial,
  Entity,
  EntityRepository,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import Category from './Category'
import Resource from './Resource'
import Tag from './Tag'

@Entity()
export default class Post {
  @PrimaryGeneratedColumn() public id: number

  @Column() public title: string

  @Column() public description: string

  @ManyToMany(type => Resource)
  @JoinTable()
  public resources: Resource[]

  @ManyToOne(type => Category, category => category.posts)
  public category: Category

  @ManyToMany(type => Tag)
  @JoinTable()
  public tags: Tag[]
}
