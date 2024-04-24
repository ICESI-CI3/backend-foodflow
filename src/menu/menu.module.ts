import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { IngredientsController } from 'src/ingredients/ingredients.controller';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { Product } from 'src/product/entities/product.entity';
import { ProductToIngredient } from 'src/product/entities/productToIngredient.entity';
import { ProductController } from 'src/product/product.controller';
import { ProductService } from 'src/product/product.service';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { Location } from 'src/location/entities/location.entity';
import { LocationService } from 'src/location/location.service';
import { LocationController } from 'src/location/location.controller';
import { Logistic } from 'src/logistic/entities/logistic.entity';
import { LogisticService } from 'src/logistic/logistic.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Ingredient, ProductToIngredient, Location, Logistic])],
    controllers: [MenuController, ProductController, IngredientsController, LocationController],
    providers: [MenuService, ProductService, IngredientsService, LocationService, LogisticService],
})
export class MenuModule {}