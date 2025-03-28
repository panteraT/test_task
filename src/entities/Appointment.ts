import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { User } from './User';
import { TimeSlot } from './TimeSlot';

@Entity("appointments")
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', name: 'date_time', nullable: false  })
  date_time: Date;

  @OneToOne(() => TimeSlot, slot => slot.appointment, { nullable: false })
  @JoinColumn({ name: 'time_slot_id' })
  time_slot: TimeSlot;

  @ManyToOne(() => User, user => user.appointments, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ default: false })
  reminded24h: boolean;

  @Column({ default: false })
  reminded2h: boolean;
}