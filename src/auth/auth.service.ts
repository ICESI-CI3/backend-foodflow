import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { v4 as UUID } from 'uuid';

@Injectable()
export class AuthService {
  constructor(  
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.userService.findOneByID(registerDto.email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    return await this.userService.create({
      id: UUID(),
      ...registerDto,
      password: bcryptjs.hashSync(registerDto.password, 10),
    });
  }

  async login(userId: any, loginDto: LoginDto) {
    const user = await this.userService.findOneByID(userId);

    if (!user) {
      throw new UnauthorizedException(
        `The user with the ID ${userId} does not exist`,
      );
    }

    console.log(user)

    const isPasswordValid = bcryptjs.compareSync(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Password does not match the user ID provided',
      );
    }

    const payload = {email: user.email, id: user.id, name: user.name, role: user.role};

    const token = await this.jwtService.signAsync(payload);

    return {token,user};
  }
}
