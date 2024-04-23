import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';

//agregar el configModule

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'secret',
  database: 'restaurant',
  entities: ["./src/**/entities/*.entity{.ts,.js}"],
  logging: true,
  synchronize: false,
  migrationsRun: false,
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migrations',
});