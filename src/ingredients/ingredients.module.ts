import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { Location } from 'src/location/entities/location.entity';
import { LocationService } from 'src/location/location.service';
import { LocationController } from 'src/location/location.controller';
import { Logistic } from 'src/logistic/entities/logistic.entity';
import { LogisticService } from 'src/logistic/logistic.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient, Location, Logistic])],
  controllers: [IngredientsController, LocationController],
  providers: [IngredientsService, LocationService, LogisticService],
})
export class IngredientsModule {}
