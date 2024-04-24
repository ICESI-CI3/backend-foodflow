import { Controller, Post, Body, Get, UseGuards, Req, SetMetadata, } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginUserDto, CreateUserDto } from './dto';
import { GetUser } from './decorators/get-user.decorator';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces/valid-role';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto ) {
    return this.authService.create( createUserDto );
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto ) {
    return this.authService.login( loginUserDto );
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(@Req() req: any){
    console.log(req.user);
    return {
      ok: true,
      message:  "Hello World"
    }
  }

  @Get('private2')
  //@SetMetadata('roles', ['super-user'])
  @RoleProtected(ValidRoles.admin, ValidRoles.superUser)
  @UseGuards(AuthGuard(), UserRoleGuard)
  testingPrivateRoute2(@GetUser('roles') user: any){
    console.log(user);
    return {
      ok: true,
      message:  "Hello World"
    }
  }  

  @Get('private3')
  @Auth( ValidRoles.superUser)
  testingPrivateRoute3(@GetUser('roles') user: any){
    console.log(user);
    return {
      ok: true,
      message:  "Hello World"
    }
  }  

}