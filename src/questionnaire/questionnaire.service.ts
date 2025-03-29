import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Questionnaire } from './questionnaire.entity';
import { QuestionnaireDto } from './dto/questionnaire.dto';
import { User } from '../users/user.entity';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectRepository(Questionnaire)
    private questionnaireRepository: Repository<Questionnaire>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async saveResponses(userId: number, dto: QuestionnaireDto) {
    const questionnaire = this.questionnaireRepository.create({
      ...dto,
      user: { id: userId },
    });

    await this.questionnaireRepository.save(questionnaire);

    await this.userRepository.update(userId, { hasCompletedQuestionnaire: true });

    return { message: 'Respuestas guardadas correctamente' };
  }

  async hasCompleted(userId: number): Promise<{ completed: boolean }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return { completed: user?.hasCompletedQuestionnaire ?? false };
  }
}

