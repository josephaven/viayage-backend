import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController], // Asegúrate de que el controlador esté aquí
})
export class AppModule {}
