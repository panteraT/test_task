import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TimeSlot } from './TimeSlot';
import { Appointment } from './Appointment';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  email: string;

  @OneToMany(() => TimeSlot, time_slot => time_slot.user)
  time_slots: TimeSlot[];

  @OneToMany(() => Appointment, appointment => appointment.user)
  appointments: Appointment[];
}