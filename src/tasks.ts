import { DeepPartial, EntityManager, EntityRepository } from 'typeorm'
import { Category } from './entity/Category'
import { Post } from './entity/Post'
import { Resource } from './entity/Resource'
import { Tag } from './entity/Tag'

interface IPostDraft extends DeepPartial<Post> {
  resources?: Array<DeepPartial<Resource>>
  tags?: Array<DeepPartial<Tag>>
  category?: DeepPartial<Category>
}

interface IEntityWithId {
  id: number
}

@EntityRepository()
export class MainRepository {
  constructor(private manager: EntityManager) {}

  public async createPost(postDraft: IPostDraft) {
    const { title, description, resources, tags, category } = postDraft
    const actualResources =
      resources &&
      (await Promise.all(resources.map(this.preloadOrSave(Resource))))
    const actualTags =
      tags && (await Promise.all(tags.map(this.preloadOrSave(Tag))))
    const actualCategory = await this.preloadOrSave(Category)(category)
    const post = this.manager.create(Post, {
      category: actualCategory,
      description,
      resources: actualResources,
      tags: actualTags,
      title,
    })
    return this.manager.save(post)
  }

  private preloadOrSave<E extends IEntityWithId>(
    entityClass: new () => E
  ): (e: DeepPartial<E>) => Promise<E> {
    return entity => {
      return entity.id
        ? this.manager.findOne(entityClass, entity.id as any)
        : this.manager.save(this.manager.create(entityClass, entity))
    }
  }
}
