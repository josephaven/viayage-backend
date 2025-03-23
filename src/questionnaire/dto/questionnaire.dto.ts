import { IsArray, IsNotEmpty, IsString, ArrayMaxSize } from 'class-validator';

export class QuestionnaireDto {
  @IsArray()
  @ArrayMaxSize(3, { message: 'Solo puedes seleccionar hasta 3 intereses de viaje' })
  travelInterests: string[];

  @IsString()
  travelCompanion: string;

  @IsString()
  foodPreference: string;

  @IsString()
  cityPreference: string;

  @IsString()
  visitDuration: string;

  @IsString()
  budget: string;
}
