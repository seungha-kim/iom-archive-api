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
import { Category } from './Category'
import { Resource } from './Resource'
import { Tag } from './Tag'

@Entity()
export class Post {
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

function sanitizeIdentifiedEntity<T extends object>(entity: T): T {
  if ('id' in entity) {
    for (const k of Object.keys(entity)) {
      delete entity[k]
    }
  }
  return entity
}

interface IPostDraft extends DeepPartial<Post> {
  resources?: Array<DeepPartial<Resource>>
  tags?: Array<DeepPartial<Tag>>
  category?: DeepPartial<Category>
}

@EntityRepository(Post)
export class PostRepository extends AbstractRepository<Post> {
  public async createPost(postDraft: IPostDraft) {
    const { title, description, resources, tags, category } = postDraft
    const actualResources = await Promise.all(
      resources.map(r =>
        this.manager.preload(Resource, sanitizeIdentifiedEntity(r)),
      ),
    )
    const actualTags = await Promise.all(
      tags.map(t => this.manager.preload(Tag, sanitizeIdentifiedEntity(t))),
    )
    const actualCategory = await this.manager.preload(
      Category,
      sanitizeIdentifiedEntity(category),
    )
    const post = this.repository.create({
      category: actualCategory,
      description,
      resources: actualResources,
      tags: actualTags,
      title,
    })
    return this.repository.save(post)
  }
}
