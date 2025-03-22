import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ type: 'date' }) 
  fechaNacimiento: string;

  @Column()
  genero: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
