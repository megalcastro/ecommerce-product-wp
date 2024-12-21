// src/app.module.ts
import { Module } from '@nestjs/common';
import { ProductModule } from './application/modules/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './infrastructure/persistence/data-source';

@Module({
  imports: [
    ProductModule,
    // Aquí configuramos TypeORM con la conexión a la base de datos
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: '',
      password: '',
      database: 'ecommerce',
      entities: [__dirname + '/core/domain/entities/*.entity{.ts,.js}'], // Rutas a las entidades
      synchronize: true, // Habilita para sincronizar entidades
      migrations: [__dirname + '/infrastructure/persistence/migrations/*.ts'], // Migrations
    }),

    // Importamos los módulos de producto y transacción
  ],
})
export class AppModule {
 
}
