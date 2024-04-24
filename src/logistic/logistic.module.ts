/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { LogisticService } from './logistic.service';
import { LogisticController } from './logistic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logistic } from './entities/logistic.entity';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { IngredientsController } from 'src/ingredients/ingredients.controller';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { Product } from 'src/product/entities/product.entity';
import { Order } from 'src/order/entities/order.entity';
import { OrderController } from 'src/order/order.controller';
import { ProductController } from 'src/product/product.controller';
import { OrderService } from 'src/order/order.service';
import { ProductService } from 'src/product/product.service';
import { Location } from 'src/location/entities/location.entity';
import { LocationService } from 'src/location/location.service';

@Module({
  imports: [TypeOrmModule.forFeature([Logistic, Ingredient, Location])],
  controllers: [LogisticController, IngredientsController,],
  providers: [LogisticService, IngredientsService, LocationService],
})
export class LogisticModule {}
