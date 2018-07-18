import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export default class Tag {
  @PrimaryGeneratedColumn() public id: number

  @Column() public name: string
}
