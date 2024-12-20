import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // o 'postgres'
      host: 'localhost',
      port: 5432, // Cambiar si usas PostgreSQL
      username: '',
      password: '',
      database: 'ecommerce',
      autoLoadEntities: true,
      synchronize: true, // Cambiar a false en producción
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
