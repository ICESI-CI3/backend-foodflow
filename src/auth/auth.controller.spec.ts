import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    // Create a mock AuthService
    const mockAuthService = {
      register: jest.fn(),
      login: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).overrideGuard(AuthGuard)
    .useValue({ canActivate: () => true }) // Mocking UserRoleGuard
    .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('should call AuthService.register with RegisterDto', async () => {
      const registerDto = new RegisterDto();
      registerDto.id = '123456';
      registerDto.name = 'John Doe';
      registerDto.email = 'john@example.com';
      registerDto.password = 'password123';
      registerDto.role = ['user'];

      //authService.register.mockResolvedValue('Some Value');

      await controller.register(registerDto);
      expect(authService.register).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('login', () => {
    it('should call AuthService.login with LoginDto', async () => {
      const loginDto = new LoginDto();
      loginDto.id = '123456';
      loginDto.password = 'password123';

      //authService.login.mockResolvedValue('Some Token');

      await controller.login(loginDto);
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('profile', () => {
    it('should return the profile of the currently authenticated user', async () => {
      const req = {
        user: {
          id: '123456',
          name: 'John Doe',
          email: 'john@example.com'
        }
      };

      const result = controller.profile(req);
      expect(result).toEqual(req.user);
    });
  });
});
