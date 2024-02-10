import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findOne(query): Promise<User> {
    console.log('findOne - query:', query);
    return this.userRepository.findOneBy(query);
  }

  async createUser(user: any): Promise<User[]> {
    try {
      console.log('createUser - user:', user);
      if (!user.username) {
        throw new Error('Username is required');
      }

      if (!user.password) {
        throw new Error('Password is required');
      }

      if (!user.name) {
        throw new Error('Name is required');
      }

      if (!user.email) {
        throw new Error('Email is required');
      }

      const newUser = this.userRepository.create(user);

      const userEntity = await this.userRepository.save(newUser);
      Logger.log('createUser - Created user', userEntity);

      return userEntity;
    } catch (e) {
      Logger.log(e);
      throw e;
    }
  }
}
