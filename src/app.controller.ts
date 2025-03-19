import { Controller, Get } from '@nestjs/common';

@Controller('test') // Define el prefijo de la ruta
export class AppController {
  @Get()
  checkConnection(): string {
    return 'Backend conectado correctamente';
  }
}
