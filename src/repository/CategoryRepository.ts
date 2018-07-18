import { EntityRepository, Repository } from 'typeorm'
import Category from '../entity/Category'

@EntityRepository(Category)
export default class CategoryRepository extends Repository<Category> {
  public async createCategory(name: string) {
    const category = this.manager.create(Category, { name })
    return this.manager.save(category)
  }
}
