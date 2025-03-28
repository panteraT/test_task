import { DataSource } from 'typeorm';
import 'reflect-metadata';
import { User } from '../entities/User';
import { Doctor } from '../entities/Doctor';
import { TimeSlot } from '../entities/TimeSlot';
import { Appointment } from '../entities/Appointment';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'test_db',
  synchronize: false,
  logging: true,
  entities: [User, Doctor, TimeSlot, Appointment],
  migrations: ['src/migrations/*.ts'],
});