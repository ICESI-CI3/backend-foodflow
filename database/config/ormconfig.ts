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
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["./src/**/entities/*.entity{.ts,.js}"],
  ssl: Boolean(process.env.DB_SSL),
  logging: true,
  synchronize: true,
  migrationsRun: true,
  migrations: ['./database/migrations/*.ts'],
  migrationsTableName: 'migrations',

}

export const source = new DataSource(

  options as DataSourceOptions & SeederOptions

);