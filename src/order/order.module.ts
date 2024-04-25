import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { Product } from 'src/product/entities/product.entity';
import { ProductController } from 'src/product/product.controller';
import { IngredientsController } from 'src/ingredients/ingredients.controller';
import { ProductService } from 'src/product/product.service';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { ProductToIngredient } from 'src/product/entities/productToIngredient.entity';
import { LocationService } from 'src/location/location.service';
import { LocationController } from 'src/location/location.controller';
import { Location } from 'src/location/entities/location.entity';
import { Logistic } from 'src/logistic/entities/logistic.entity';
import { LogisticService } from 'src/logistic/logistic.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, Ingredient, ProductToIngredient, Location, Logistic]), UsersModule],
  controllers: [OrderController, ProductController, IngredientsController, LocationController],
  providers: [OrderService, ProductService, IngredientsService, LocationService, LogisticService, UsersService],
  exports: [OrderService, TypeOrmModule.forFeature([Order])],
})
export class OrderModule {}
