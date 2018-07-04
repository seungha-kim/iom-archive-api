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
      resources.map(
        r =>
          r.id
            ? this.manager.preload(Resource, r)
            : this.manager.save(Resource, r),
      ),
    )
    const actualTags = await Promise.all(
      tags.map(
        t => (t.id ? this.manager.preload(Tag, t) : this.manager.save(Tag, t)),
      ),
    )
    const actualCategory = await (category.id
      ? this.manager.preload(Category, category)
      : this.manager.save(Category, category))
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
