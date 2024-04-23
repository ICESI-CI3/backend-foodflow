import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logistic } from 'src/logistic/entities/logistic.entity';
import { Location } from 'src/location/entities/location.entity';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { LogisticService } from 'src/logistic/logistic.service';
import { LocationService } from 'src/location/location.service';
import { OrderService } from 'src/order/order.service';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { ProductToIngredient } from 'src/product/entities/productToIngredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Logistic, Location, Order, Product, ProductToIngredient, Ingredient])],
  controllers: [ReportController],
  providers: [ReportService, LogisticService, LocationService, OrderService, IngredientsService]
})
export class ReportModule {}
