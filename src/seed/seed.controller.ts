/* eslint-disable prettier/prettier */
import { Controller, Post, UseGuards } from '@nestjs/common';
import { SeedService } from './seed.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UserRoleGuard } from 'src/auth/guard/user-role.guard';
import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';

@Controller('seed')
export class SeedController {

  constructor(private readonly seedService: SeedService) {}

  @Post('/create')
  @UseGuards(AuthGuard, UserRoleGuard)
  @RoleProtected(ValidRoles.admin, ValidRoles.superUser)
  seed() {

    return this.seedService.seed();
  
  }

}