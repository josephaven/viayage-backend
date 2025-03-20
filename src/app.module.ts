import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module'; 
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433, 
      username: 'postgres',
      password: 'N16j1204',
      database: 'viayage_db',
      entities: [User],
      synchronize: true,
    }),
    AuthModule, 
  ],
})
export class AppModule {}
