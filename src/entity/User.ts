import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn() public id: number

  @Column()
  @Index('idx_user_username', {
    unique: true,
  })
  public password: string

  @Column() public username: string
}
