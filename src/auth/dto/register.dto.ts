import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsDateString,
  IsIn,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre: string;

  @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
  apellido: string;

  @IsDateString({}, { message: 'La fecha de nacimiento no es válida' })
  fechaNacimiento: string;

  @IsIn(['masculino', 'femenino', 'otro'], {
    message: 'El género debe ser masculino, femenino u otro',
  })
  genero: string;

  @IsEmail({}, { message: 'El correo no es válido' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}
