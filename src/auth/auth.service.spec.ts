import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { ValidRoles } from './interfaces/valid-roles';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;

  const mockUserService = {
    findOneByID: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      // Asegúrate de que todos los campos necesarios están incluidos
      const registerDto = {
        id: '123456',
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        role: [ValidRoles.superUser]  // Asumiendo que USER es un valor válido en ValidRoles
      };
  
      const hashedPassword = bcryptjs.hashSync(registerDto.password, 10);
      mockUserService.findOneByID.mockResolvedValueOnce(null);
      mockUserService.create.mockResolvedValueOnce({
        ...registerDto,
        password: hashedPassword
      });
  
      const result = await service.register(registerDto);
  
      expect({...result, password:""}).toEqual({ ...registerDto, password: "" });
      expect(mockUserService.findOneByID).toHaveBeenCalledWith(registerDto.id);
    });
  
    it('should throw BadRequestException if user already exists', async () => {
      // Incluye todos los campos necesarios aquí también
      const registerDto = {
        id: '123456',
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        role: [ValidRoles.superUser]
      };
  
      mockUserService.findOneByID.mockResolvedValueOnce({ id: '123' });
  
      await expect(service.register(registerDto)).rejects.toThrow(BadRequestException);
      expect(mockUserService.findOneByID).toHaveBeenCalledWith(registerDto.id);
      expect(mockUserService.create).not.toHaveBeenCalled();
    });
  });
  

  describe('login', () => {
    it('should login a user with valid credentials', async () => {
      const loginDto = { id: '123', password: 'password' };
      const user = { id: '123', email: 'test@example.com', password: bcryptjs.hashSync('password', 10), name: "1", role: [ValidRoles.superUser] };
      const token = 'mocked_token';
      const payload = { email: user.email, id: user.id, name: user.name, role: user.role };

      mockUserService.findOneByID.mockResolvedValueOnce(user);
      mockJwtService.signAsync.mockResolvedValueOnce(token);

      const result = await service.login(loginDto);

      expect(result).toEqual({ token, user });
      expect(mockUserService.findOneByID).toHaveBeenCalledWith(loginDto.id);
      expect(mockJwtService.signAsync).toHaveBeenCalledWith(payload);
    });

    it('should throw UnauthorizedException if user does not exist', async () => {
      const loginDto = { id: '123', password: 'password' };
      mockUserService.findOneByID.mockResolvedValueOnce(null);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
      expect(mockUserService.findOneByID).toHaveBeenCalledWith(loginDto.id);
      expect(mockJwtService.signAsync).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      const loginDto = { id: '123', password: 'incorrect_password' };
      const user = { id: '123', email: 'test@example.com', password: bcryptjs.hashSync('password', 10) };

      mockUserService.findOneByID.mockResolvedValueOnce(user);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
      expect(mockUserService.findOneByID).toHaveBeenCalledWith(loginDto.id);
      expect(mockJwtService.signAsync).not.toHaveBeenCalled();
    });
  });
});
