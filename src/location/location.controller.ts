/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { UpdateIngredientDto } from 'src/ingredients/dto/update-ingredient.dto';
import { LogisticService } from 'src/logistic/logistic.service';
import { CreateLogisticDto } from 'src/logistic/dto/create-logistic.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';
import { UserRoleGuard } from 'src/auth/guard/user-role.guard';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';

@Controller('location')
export class LocationController {
  constructor(
    
    private readonly locationService: LocationService,
    private readonly ingredientsService: IngredientsService,
    private readonly logisticService: LogisticService
  
  ) {}

  //Methods of location
  @Get()
  @UseGuards(AuthGuard('bearer'), UserRoleGuard)
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  findAll() {

    return this.locationService.findAll();

  }

  @Get('getOne/:id')
  @UseGuards(AuthGuard('bearer'), UserRoleGuard)
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  findOne(@Param('id') id: any) {

    return this.locationService.findOne(id);

  }

  @Post('/create')
  @UseGuards(AuthGuard('bearer'), UserRoleGuard)
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  create(@Body() createLocationDto: CreateLocationDto) {

    return this.locationService.create(createLocationDto);

  }

  @Put('update/:id')
  @UseGuards(AuthGuard('bearer'), UserRoleGuard)
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  update(@Param('id') id: any, @Body() updateLocationDto: UpdateLocationDto) {

    return this.locationService.update(id, updateLocationDto);

  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard('bearer'), UserRoleGuard)
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  remove(@Param('id') id: any) {

    return this.locationService.remove(id);
    
  }

  //methods of ingredient
  @Get('ingredients')
  @UseGuards(AuthGuard('bearer'), UserRoleGuard)
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  findAllIngredient() {

    return this.ingredientsService.findAll();

  }

  @Get('ingredient/getOne/:id')
  @UseGuards(AuthGuard('bearer'), UserRoleGuard)
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  findOneByIdIngredient(@Param('id') id: any) {

    return this.ingredientsService.findOneById(id);

  }

  @Put('ingredient/update/:id')
  @UseGuards(AuthGuard('bearer'), UserRoleGuard)
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  updateIngredient(@Param('id') id: any, @Body() updateIngredientDto: UpdateIngredientDto) {

    return this.ingredientsService.update(id, updateIngredientDto);

  }

  @Delete('ingredient/delete/:id')
  @UseGuards(AuthGuard('bearer'), UserRoleGuard)
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  removeIngredient(@Param('id') id: any) {

    return this.ingredientsService.remove(id);

  }

  //methods of logistic

  @Get('logistic')
  @UseGuards(AuthGuard('bearer'), UserRoleGuard)
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  findAllLogistic() {

    return this.logisticService.findAll();

  }

  @Get('logistic/getOne/:id')
  @UseGuards(AuthGuard('bearer'), UserRoleGuard)
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  findOneLogistic(@Param('id') id: any) {

    return this.logisticService.findOne(id);

  }

  @Post('logistic/create')
  @UseGuards(AuthGuard('bearer'), UserRoleGuard)
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  async createLogistic(@Body() createLogisticDto: CreateLogisticDto) {

    await this.ingredientsService.verifyCreation(createLogisticDto.ingredients)

    return this.logisticService.create(createLogisticDto);

  }

}
