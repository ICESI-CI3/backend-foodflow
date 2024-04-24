import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOneByID: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        id: '1',
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
        role: ['user'],
      };

      await controller.create(createUserDto);

      expect(userService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users: User[] = [
        {
          id: '1',
          name: 'User 1',
          email: 'user1@example.com',
          password: 'password1',
          role: ['user'],
          rating: 4,
          deletedAt: null,
        },
        {
          id: '2',
          name: 'User 2',
          email: 'user2@example.com',
          password: 'password2',
          role: ['user'],
          rating: 3,
          deletedAt: null,
        },
      ];
      jest.spyOn(userService, 'findAll').mockResolvedValue(users);

      const result = await controller.findAll();

      expect(result).toEqual(users);
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
      jest.spyOn(userService, 'findOneByID').mockResolvedValue(user);

      const result = await controller.findOneByID(userId);

      expect(result).toBe(user);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userId = '123456';
      const updateUserDto: UpdateUserDto = { name: 'New Name', rating: 5 };
      jest
        .spyOn(userService, 'update')
        .mockResolvedValue({ affected: 1 } as UpdateResult);

      const result = await controller.update(userId, updateUserDto);

      expect(result).toEqual({ affected: 1 }); // Verifica que el objeto resultado tenga la propiedad affected igual a 1
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const userId = '123456';
      jest
        .spyOn(userService, 'remove')
        .mockResolvedValue({ affected: 1 } as DeleteResult);

      const result = await controller.remove(userId);

      expect(result).toEqual({ affected: 1 }); // Verifica que el objeto resultado tenga la propiedad affected igual a 1
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
