import { Repository } from 'typeorm';
import { TimeSlot } from '../entities/TimeSlot';
import { Doctor } from '../entities/Doctor';
import { AppDataSource } from "../config/data-source"; 


export class TimeSlotRepository extends Repository<TimeSlot> {

    static async findFreeSlotByDoctor(doctor: Doctor): Promise<TimeSlot[] | null> {
        return await AppDataSource.getRepository(TimeSlot).find({ where: { doctor, is_free: true} });
    }

    static async findFreeSlotByDoctorAndTime(doctor: Doctor, date_time: Date): Promise<TimeSlot | null> {
        return await AppDataSource.getRepository(TimeSlot).findOne({ where: { doctor, date_time, is_free: true} });
    }

    static async createAndSaveSlot(timeSlotData: Partial<TimeSlot>): Promise<TimeSlot> {
        const slot = await AppDataSource.getRepository(TimeSlot).create(timeSlotData);
        return await AppDataSource.getRepository(TimeSlot).save(slot);
    }

    static async updateSlot(id: number, updateData: Partial<TimeSlot>): Promise<TimeSlot | null> {
        await AppDataSource.getRepository(TimeSlot).update(id, updateData);
        return await AppDataSource.getRepository(TimeSlot).findOne({where: {id}});
    }
}