import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireDto } from './dto/questionnaire.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('questionnaire')
export class QuestionnaireController {
  constructor(private questionnaireService: QuestionnaireService) {}


  @UseGuards(JwtAuthGuard)
  @Post()
  save(@Body() body: QuestionnaireDto, @Req() req: any) {
    return this.questionnaireService.saveResponses(req.user.userId, body);
  }

  
  @UseGuards(JwtAuthGuard)
  @Get('status')
  checkStatus(@Req() req: any) {
    return this.questionnaireService.hasCompleted(req.user.userId);
  }
}
