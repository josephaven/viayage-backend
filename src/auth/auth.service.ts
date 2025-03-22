import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { RegisterDto } from '../auth/dto/register.dto'; 

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async register(registerDto: RegisterDto) {
    const { nombre, apellido, fechaNacimiento, genero, email, password } = registerDto;
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = this.userRepository.create({
      nombre,
      apellido,
      fechaNacimiento,
      genero,
      email,
      password: hashedPassword,
    });
  
    await this.userRepository.save(user);
  
    return { message: 'Usuario registrado exitosamente' };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
  
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
  
    const token = this.jwtService.sign({ userId: user.id });
    return { access_token: token };
  }

  async forgotPassword(email: string) {
    
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    console.log("✅ Usuario encontrado:", user.email);
    const resetToken = this.jwtService.sign({ userId: user.id }, { expiresIn: '1h' });

    console.log("🔑 Token generado:", resetToken);
    console.log("📧 EMAIL_USER:", process.env.EMAIL_USER);
    console.log("🔑 EMAIL_PASS:", process.env.EMAIL_PASS);
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true para SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `http://localhost:3000/auth/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Recuperación de contraseña',
      text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`,
    });

    return { message: 'Correo de recuperación enviado' };
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.userRepository.findOne({ where: { id: decoded.userId } });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await this.userRepository.save(user);

      return { message: 'Contraseña actualizada exitosamente' };
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
  
}
