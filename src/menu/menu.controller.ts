import { Controller, Get, Param, Post } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {

    constructor(private readonly menuService: MenuService) {}

    @Get()
    findAll() {
  
      return this.menuService.findAll();
  
    }
  
    @Get('getOne/:id')
    findOne(@Param('id') id: any) {
  
      return this.menuService.findOne(id);
  
    }

}
