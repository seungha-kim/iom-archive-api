import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Resource {
  @PrimaryGeneratedColumn() public id: number

  @Column() public name: string

  @Column() public resourceUrl: string
}
