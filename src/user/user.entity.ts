import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  Unique,
} from 'typeorm';
import { hash } from 'bcrypt';
import { Min, IsEmail } from 'class-validator';
import { UserInterface } from './users.interface';

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User implements UserInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Min(8)
  password: string;

  @Column()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  public static of(params: Partial<User>): User {
    const user = new User();
    Object.assign(user, params);
    return user;
  }
}

export class UserListRespositoryFake {
  public create(): void {}
  public async remove(): Promise<void> {}
  public async findOne(): Promise<void> {}
  public async save(): Promise<void> {}
}
