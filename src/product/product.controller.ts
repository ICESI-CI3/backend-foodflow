/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AddDeleteProductIngredientDto } from './dto/add_delete_product-ingredient.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';
import { UserRoleGuard } from 'src/auth/guard/user-role.guard';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
//import { Product } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @UseGuards(AuthGuard, UserRoleGuard)
  @RoleProtected(ValidRoles.admin, ValidRoles.superUser)
  findAll() {

    return this.productService.findAll();
    
  }

  @Get('/getOne/:id')
  @UseGuards(AuthGuard, UserRoleGuard)
  @RoleProtected(ValidRoles.admin, ValidRoles.superUser)
  findOne(@Param('id') id: any) {

    return this.productService.findOneById(id);

  }

  @Post('/create')
  @UseGuards(AuthGuard, UserRoleGuard)
  @RoleProtected(ValidRoles.admin, ValidRoles.superUser)
  create(@Body() createProductDto: CreateProductDto) {

    return this.productService.create(createProductDto);

  }

  @Put('/update/:id')
  @UseGuards(AuthGuard, UserRoleGuard)
  @RoleProtected(ValidRoles.admin, ValidRoles.superUser)
  update(@Param('id') id: any, @Body() updateProductDto: UpdateProductDto) {

    return this.productService.update(id, updateProductDto);

  }

  @Put('/addIngredient/:id')
  @UseGuards(AuthGuard, UserRoleGuard)
  @RoleProtected(ValidRoles.admin, ValidRoles.superUser)
  addIngredient(@Param('id') productId: any, @Body() ingredientNames: AddDeleteProductIngredientDto) {

    return this.productService.addIngredient(productId, ingredientNames);

  }

  @Put('/deleteIngredient/:id')
  @UseGuards(AuthGuard, UserRoleGuard)
  @RoleProtected(ValidRoles.admin, ValidRoles.superUser)
  deleteIngredient(@Param('id') productId: any, @Body() ingredientNames: AddDeleteProductIngredientDto) {

    return this.productService.deleteIngredient(productId, ingredientNames);

  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard, UserRoleGuard)
  @RoleProtected(ValidRoles.admin, ValidRoles.superUser)
  remove(@Param('id') id: any) {

    return this.productService.remove(id);

  }
  
}
