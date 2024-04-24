/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AddDeleteOrderProductDto } from './dto/add_delete_order-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';
import { UserRoleGuard } from 'src/auth/guard/user-role.guard';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @UseGuards(AuthGuard('bearer'), UserRoleGuard)
  @RoleProtected(ValidRoles.mesero, ValidRoles.superUser)
  findAll() {

    return this.orderService.findAll();

  }

  @Get('getOne/:id')
  @UseGuards(AuthGuard('bearer'), UserRoleGuard)
  @RoleProtected(ValidRoles.mesero, ValidRoles.superUser)
  findOne(@Param('id') id: any) {

    return this.orderService.findOne(id);

  }

  @Post('/create')
  @UseGuards(AuthGuard('bearer'), UserRoleGuard)
  @RoleProtected(ValidRoles.mesero, ValidRoles.superUser)
  create(@Body() createOrderDto: CreateOrderDto) {

    return this.orderService.create(createOrderDto);

  }

  @Put('update/:id')
  @UseGuards(AuthGuard('bearer'), UserRoleGuard)
  @RoleProtected(ValidRoles.mesero, ValidRoles.chef, ValidRoles.superUser)
  update(@Param('id') id: any, @Body() updateOrderDto: UpdateOrderDto) {

    return this.orderService.update(id, updateOrderDto);

  }

  @Put('/addProduct/:id')
  @UseGuards(AuthGuard('bearer'), UserRoleGuard)
  @RoleProtected(ValidRoles.mesero, ValidRoles.superUser)
  addIngredient(@Param('id') orderId: any, @Body() productNames: AddDeleteOrderProductDto) {

    return this.orderService.addProduct(orderId, productNames);

  }

  @Put('/deleteProduct/:id')
  @UseGuards(AuthGuard('bearer'), UserRoleGuard)
  @RoleProtected(ValidRoles.mesero, ValidRoles.superUser)
  deleteIngredient(@Param('id') orderId: any, @Body() productNames: AddDeleteOrderProductDto) {

    return this.orderService.deleteOrder(orderId, productNames);

  }


  @Delete('delete/:id')
  @UseGuards(AuthGuard('bearer'), UserRoleGuard)
  @RoleProtected(ValidRoles.mesero, ValidRoles.superUser)
  remove(@Param('id') id: any) {

    return this.orderService.remove(id);
    
  }
}
