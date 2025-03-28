import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Doctor } from './Doctor';
import { User } from './User';
import { Appointment } from './Appointment';

@Entity('time_slots')
export class TimeSlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', nullable: false })
  date_time: Date;

  @Column({ default: true })
  is_free: boolean;

  @ManyToOne(() => Doctor, doctor => doctor.time_slots, { nullable: false })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @ManyToOne(() => User, user => user.time_slots)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @OneToOne(() => Appointment, appointment => appointment.time_slot)
  appointment: Appointment;

}