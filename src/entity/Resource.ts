import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export default class Resource {
  @PrimaryGeneratedColumn() public id: number

  @Column() public name: string

  @Column() public resourceUrl: string
}
