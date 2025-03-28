import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TimeSlot } from './TimeSlot';

@Entity("doctors")
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  speciality: string;

  @OneToMany(() => TimeSlot, time_slot => time_slot.doctor)
  time_slots: TimeSlot[];
}