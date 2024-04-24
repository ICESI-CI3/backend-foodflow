/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { Location } from './entities/location.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { IngredientsController } from 'src/ingredients/ingredients.controller';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { OrderController } from 'src/order/order.controller';
import { ProductController } from 'src/product/product.controller';
import { OrderService } from 'src/order/order.service';
import { ProductService } from 'src/product/product.service';
import { ProductToIngredient } from 'src/product/entities/productToIngredient.entity';
import { Logistic } from 'src/logistic/entities/logistic.entity';
import { LogisticService } from 'src/logistic/logistic.service';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Ingredient, Logistic])],
  controllers: [LocationController, IngredientsController],
  providers: [LocationService, IngredientsService, LogisticService]
})
export class LocationModule {}
