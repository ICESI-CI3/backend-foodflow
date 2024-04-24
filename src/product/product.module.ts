import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { IngredientsController } from 'src/ingredients/ingredients.controller';
import { ProductToIngredient } from './entities/productToIngredient.entity';
import { Location } from 'src/location/entities/location.entity';
import { LocationService } from 'src/location/location.service';
import { LocationController } from 'src/location/location.controller';
import { Logistic } from 'src/logistic/entities/logistic.entity';
import { LogisticService } from 'src/logistic/logistic.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Ingredient, ProductToIngredient, Location, Logistic])],
  controllers: [ProductController, IngredientsController, LocationController],
  providers: [ProductService, IngredientsService, LocationService, LogisticService],
})
export class ProductModule {}
