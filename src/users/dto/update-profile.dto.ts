import { IsDateString, IsNotEmpty, IsIn } from 'class-validator';

export class UpdateProfileDto {
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  apellido: string;

  @IsDateString()
  fechaNacimiento: string;

  @IsIn(['masculino', 'femenino', 'otro'])
  genero: string;
}
