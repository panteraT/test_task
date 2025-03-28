import {Repository } from 'typeorm';
import { Appointment } from '../entities/Appointment';
import { AppDataSource } from "../config/data-source"; 

export class AppointmentRepository extends Repository<Appointment> {
    
    static async findAppointment(id: number): Promise<Appointment | null> {
        return await AppDataSource.getRepository(Appointment).findOne({ where: { id } });
    }
    static async findAppointments(targetDate: Date, reminded24h: boolean): Promise<Appointment[] | null> {
        
        const whereClause = reminded24h
            ? 'appointment.reminded24h = false'
            : 'appointment.reminded2h = false'
        return await AppDataSource.getRepository(Appointment)
            .createQueryBuilder('appointment')
            .leftJoinAndSelect('appointment.user', 'user')
            .leftJoinAndSelect('appointment.time_slot', 'time_slot')
            .leftJoinAndSelect('time_slot.doctor', 'doctor')
            .where('appointment.date_time BETWEEN :start AND :end', {
                start: targetDate.toISOString().slice(0, 19).replace('T', ' '),
                end: new Date(targetDate.getTime() + 10 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ') // +10 минут окно
            })
            .andWhere(whereClause)
            .getMany();
    }
    static async createAndSaveAppointment(appointmentData: Partial<Appointment>): Promise<Appointment> {
        const appointment = await AppDataSource.getRepository(Appointment).create(appointmentData);
        return await AppDataSource.getRepository(Appointment).save(appointment);
    }

    static async updateAppointment(id: number, updateData: Partial<Appointment>): Promise<Appointment | null> {
        await AppDataSource.getRepository(Appointment).update(id, updateData);
        return await AppDataSource.getRepository(Appointment).findOne({where: {id}});
    }

}