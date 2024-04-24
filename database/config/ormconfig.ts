/* eslint-disable prettier/prettier */
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { DataSourceOptions } from 'typeorm/data-source';

ConfigModule.forRoot({

  envFilePath: '.env',

});

const options: DataSourceOptions & SeederOptions = {

  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5431,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["./src/**/entities/*.entity{.ts,.js}"],
  logging: true,
  synchronize: false,
  migrationsRun: false,
  migrations: ['../migrations/*.ts'],
  migrationsTableName: 'migrations',

}

export const source = new DataSource(

  options as DataSourceOptions & SeederOptions

);