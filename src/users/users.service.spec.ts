import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        id: '222222',
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password456',
        role: ['admin'],
      };
      const createdUser: User = {
        ...createUserDto,
        rating: -1,
        deletedAt: null,
      };
      jest.spyOn(userRepository, 'save').mockResolvedValue(createdUser);

      expect(await service.create(createUserDto)).toBe(createdUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        {
          id: '123456',
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
          role: ['user'],
          rating: 4,
          deletedAt: null,
        },
        {
          id: '234567',
          name: 'Jane Smith',
          email: 'jane@example.com',
          password: 'password456',
          role: ['admin'],
          rating: 3,
          deletedAt: null,
        },
      ];
      jest.spyOn(userRepository, 'find').mockResolvedValue(users);

      expect(await service.findAll()).toBe(users);
    });
  });

  describe('findOneByID', () => {
    it('should return a user by ID', async () => {
      const userId = '123456';
      const user: User = {
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: ['user'],
        rating: 4,
        deletedAt: null,
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      expect(await service.findOneByID(userId)).toBe(user);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userId = 'some-id';
      const updateUserDto: UpdateUserDto = {
        rating: 5,
      };
      const updateResult = {
        raw: {},
        affected: 1,
        generatedMaps: [],
      };
      jest.spyOn(userRepository, 'update').mockResolvedValue(updateResult);

      expect(await service.update(userId, updateUserDto)).toBe(updateResult);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const userId = 'some-id';
      const deleteResult = {
        raw: {},
        affected: 1,
      };
      jest.spyOn(userRepository, 'delete').mockResolvedValue(deleteResult);

      expect(await service.remove(userId)).toBe(deleteResult);
    });
  });
});
