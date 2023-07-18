import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/user/user.entity';
import { login } from 'src/login/login.entity';

@Entity()
export class task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  completeBefore: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'assignedToUserId' })
  assignedToUser: User;

  @ManyToOne(() => login)
  @JoinColumn({ name: 'assignedByUserId' })
  assignedByUser: login;
}
