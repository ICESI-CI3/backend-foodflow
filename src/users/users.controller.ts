import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from 'src/auth/guard/user-role.guard';
import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  @UseGuards(AuthGuard('bearer'), UserRoleGuard)
  @RoleProtected(ValidRoles.admin, ValidRoles.superUser)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('bearer'), UserRoleGuard)
  @RoleProtected(ValidRoles.admin, ValidRoles.superUser)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('getOne/:id')
  @UseGuards(AuthGuard('bearer'), UserRoleGuard)
  @RoleProtected(ValidRoles.admin, ValidRoles.superUser)
  findOneByID(@Param('id') id: string) {
    return this.usersService.findOneByID(id);
  }

  @Put('update/:id')
  @UseGuards(AuthGuard('bearer'), UserRoleGuard)
  @RoleProtected(ValidRoles.admin, ValidRoles.superUser, ValidRoles.chef, ValidRoles.mesero)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard('bearer'), UserRoleGuard)
  @RoleProtected(ValidRoles.admin, ValidRoles.superUser, ValidRoles.chef, ValidRoles.mesero)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
