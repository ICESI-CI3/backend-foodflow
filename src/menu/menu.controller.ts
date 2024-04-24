import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';
import { UserRoleGuard } from 'src/auth/guard/user-role.guard';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';

@Controller('menu')
export class MenuController {

    constructor(private readonly menuService: MenuService) {}

    
    @Get()   
    @UseGuards(AuthGuard('bearer'), UserRoleGuard)
    @RoleProtected(ValidRoles.mesero, ValidRoles.chef, ValidRoles.superUser)
    findAll() {
  
      return this.menuService.findAll();
  
    }
  
    @Get('getOne/:id')
    @UseGuards(AuthGuard('bearer'), UserRoleGuard)
    @RoleProtected(ValidRoles.mesero, ValidRoles.chef, ValidRoles.superUser)
    findOne(@Param('id') id: any) {
  
      return this.menuService.findOne(id);
  
    }

}
