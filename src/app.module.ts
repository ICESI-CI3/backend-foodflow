/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MenuModule } from './menu/menu.module';
import { LocationModule } from './location/location.module';
import { LogisticModule } from './logistic/logistic.module';
import { ReportService } from './report/report.service';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false,
    retryDelay: 3000,
    retryAttempts: 10,
  }), 
  OrderModule,  
  ProductModule, 
  IngredientsModule, 
  MenuModule, 
  LocationModule, 
  LogisticModule, 
  ReportModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
