import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Questionnaire } from './questionnaire.entity';
import { QuestionnaireDto } from './dto/questionnaire.dto';
import { User } from '../users/user.entity';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectRepository(Questionnaire) private repo: Repository<Questionnaire>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async saveResponses(userId: number, dto: QuestionnaireDto) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
  
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
  
    const questionnaire = this.repo.create({
      ...dto,
      user: { id: user.id },
    });
  
    return this.repo.save(questionnaire);
  }
  
  async hasCompleted(userId: number): Promise<{ completed: boolean }> {
    const existing = await this.repo.findOne({
      where: { user: { id: userId } },
    });
  
    return { completed: !!existing };
  }
  
  
}
