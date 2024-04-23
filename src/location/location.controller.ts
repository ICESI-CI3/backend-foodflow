/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { UpdateIngredientDto } from 'src/ingredients/dto/update-ingredient.dto';
import { LogisticService } from 'src/logistic/logistic.service';
import { CreateLogisticDto } from 'src/logistic/dto/create-logistic.dto';

@Controller('location')
export class LocationController {
  constructor(
    
    private readonly locationService: LocationService,
    private readonly ingredientsService: IngredientsService,
    private readonly logisticService: LogisticService
  
  ) {}

  //Methods of location
  @Get()
  findAll() {

    return this.locationService.findAll();

  }

  @Get('getOne/:id')
  findOne(@Param('id') id: any) {

    return this.locationService.findOne(id);

  }

  @Post('/create')
  create(@Body() createLocationDto: CreateLocationDto) {

    return this.locationService.create(createLocationDto);

  }

  @Put('update/:id')
  update(@Param('id') id: any, @Body() updateLocationDto: UpdateLocationDto) {

    return this.locationService.update(id, updateLocationDto);

  }

  @Delete('delete/:id')
  remove(@Param('id') id: any) {

    return this.locationService.remove(id);
    
  }

  //methods of ingredient
  @Get('ingredients')
  findAllIngredient() {

    return this.ingredientsService.findAll();

  }

  @Get('ingredient/getOne/:id')
  findOneByIdIngredient(@Param('id') id: any) {

    return this.ingredientsService.findOneById(id);

  }

  @Put('ingredient/update/:id')
  updateIngredient(@Param('id') id: any, @Body() updateIngredientDto: UpdateIngredientDto) {

    return this.ingredientsService.update(id, updateIngredientDto);

  }

  @Delete('ingredient/delete/:id')
  removeIngredient(@Param('id') id: any) {

    return this.ingredientsService.remove(id);

  }

  //methods of logistic

  @Get('logistic')
  findAllLogistic() {

    return this.logisticService.findAll();

  }

  @Get('logistic/getOne/:id')
  findOneLogistic(@Param('id') id: any) {

    return this.logisticService.findOne(id);

  }

  @Post('logistic/create')
  async createLogistic(@Body() createLogisticDto: CreateLogisticDto) {

    await this.ingredientsService.verifyCreation(createLogisticDto.ingredients)

    return this.logisticService.create(createLogisticDto);

  }

}
