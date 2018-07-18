import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export default class User {
  @PrimaryGeneratedColumn() public id: number

  @Column() public password: string

  @Index('idx_user_username', {
    unique: true,
  })
  @Column()
  public username: string
}
