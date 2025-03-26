import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module'; 
import { User } from './users/user.entity';
import { ConfigModule } from '@nestjs/config';
import { Questionnaire } from './questionnaire/questionnaire.entity';
import { QuestionnaireService } from './questionnaire/questionnaire.service';
import { QuestionnaireController } from './questionnaire/questionnaire.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ 
    ConfigModule.forRoot(), 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433, 
      username: 'postgres',
      password: 'N16j1204',
      database: 'viayage_db',
      entities: [User, Questionnaire],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Questionnaire, User]),
    AuthModule, 
    UsersModule,
  ],
  controllers: [QuestionnaireController],
  providers: [QuestionnaireService],
})
export class AppModule {}
