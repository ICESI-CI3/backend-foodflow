import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { ReportService } from 'src/report/report.service';
import { LogisticService } from 'src/logistic/logistic.service';
import { LocationService } from 'src/location/location.service';
import { OrderService } from 'src/order/order.service';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { Logistic } from 'src/logistic/entities/logistic.entity';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { ProductToIngredient } from 'src/product/entities/productToIngredient.entity';
import { ProductService } from 'src/product/product.service';
import { Location } from 'src/location/entities/location.entity';

@Module({
  providers: [SeedService, ReportService, LogisticService, LocationService, OrderService, IngredientsService, ProductService],
  controllers: [SeedController],
  imports: [TypeOrmModule.forFeature([Logistic, Location, Order, Product, ProductToIngredient, Ingredient, Product])],
})
export class SeedModule {}