import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Questionnaire {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false })
  user: User;

  @Column("simple-array")
  travelInterests: string[]; 

  @Column()
  travelCompanion: string; 

  @Column()
  foodPreference: string; 

  @Column()
  cityPreference: string; 

  @Column()
  visitDuration: string; 

  @Column()
  budget: string; 
}
