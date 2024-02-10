import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, UserListRespositoryFake } from './user.entity';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: UserListRespositoryFake,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('Create User', () => {
    it('should create a user', async () => {
      const user = {
        username: 'test',
        password: 'test',
        name: 'test',
        email: 'jservat@gmail.com"',
      };

      const savedUser = User.of(user);

      const userRepositorySaveSpy = jest
        .spyOn(userRepository, 'save')
        .mockResolvedValue(savedUser);

      const userRepositoryCreateSpy = jest
        .spyOn(userRepository, 'create')
        .mockReturnValue(savedUser);

      const result = await userService.createUser(user);

      expect(userRepositorySaveSpy).toHaveBeenCalledWith(user);
      expect(userRepositoryCreateSpy).toHaveBeenCalledWith(user);
      expect(result).toEqual(savedUser);
    });
  });
});
