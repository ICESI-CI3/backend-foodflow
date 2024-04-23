/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AddDeleteOrderProductDto } from './dto/add_delete_order-product.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll() {

    return this.orderService.findAll();

  }

  @Get('getOne/:id')
  findOne(@Param('id') id: any) {

    return this.orderService.findOne(id);

  }

  @Post('/create')
  create(@Body() createOrderDto: CreateOrderDto) {

    return this.orderService.create(createOrderDto);

  }

  @Put('update/:id')
  update(@Param('id') id: any, @Body() updateOrderDto: UpdateOrderDto) {

    return this.orderService.update(id, updateOrderDto);

  }

  @Put('/addProduct/:id')
  addIngredient(@Param('id') orderId: any, @Body() productNames: AddDeleteOrderProductDto) {

    return this.orderService.addProduct(orderId, productNames);

  }

  @Put('/deleteProduct/:id')
  deleteIngredient(@Param('id') orderId: any, @Body() productNames: AddDeleteOrderProductDto) {

    return this.orderService.deleteOrder(orderId, productNames);

  }


  @Delete('delete/:id')
  remove(@Param('id') id: any) {

    return this.orderService.remove(id);
    
  }
}
