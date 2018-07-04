import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Tag {
  @PrimaryGeneratedColumn() public id: number

  @Column() public name: string
}
