/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseUUIDPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AddIngredientProductDto } from 'src/ingredients/dto/add-ingredient-product.dto';
import { AddDeleteProductIngredientDto } from './dto/add_delete_product-ingredient.dto';
//import { Product } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {

    return this.productService.findAll();
    
  }

  @Get('/getOne/:id')
  findOne(@Param('id') id: any) {

    return this.productService.findOneById(id);

  }

  @Post('/create')
  create(@Body() createProductDto: CreateProductDto) {

    return this.productService.create(createProductDto);

  }

  @Put('/update/:id')
  update(@Param('id') id: any, @Body() updateProductDto: UpdateProductDto) {

    return this.productService.update(id, updateProductDto);

  }

  @Put('/addIngredient/:id')
  addIngredient(@Param('id') productId: any, @Body() ingredientNames: AddDeleteProductIngredientDto) {

    return this.productService.addIngredient(productId, ingredientNames);

  }

  @Put('/deleteIngredient/:id')
  deleteIngredient(@Param('id') productId: any, @Body() ingredientNames: AddDeleteProductIngredientDto) {

    return this.productService.deleteIngredient(productId, ingredientNames);

  }

  @Delete('/delete/:id')
  remove(@Param('id') id: any) {

    return this.productService.remove(id);

  }
  
}
