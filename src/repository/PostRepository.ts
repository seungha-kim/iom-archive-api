import { DeepPartial, EntityRepository, Repository } from 'typeorm'
import Category from '../entity/Category'
import Post from '../entity/Post'
import Resource from '../entity/Resource'
import Tag from '../entity/Tag'

interface IEntityWithId {
  id: number
}

interface IPostDraft extends DeepPartial<Post> {
  resources?: Array<DeepPartial<Resource>>
  tags?: Array<DeepPartial<Tag>>
  category?: DeepPartial<Category>
}

@EntityRepository(Post)
export default class PostRepository extends Repository<Post> {
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
  ): (e: DeepPartial<E> | undefined) => Promise<E | undefined> {
    return async entity => {
      return entity === undefined
        ? entity
        : entity.id
          ? this.manager.findOne(entityClass, entity.id as any)
          : this.manager.save(this.manager.create(entityClass, entity))
    }
  }
}
