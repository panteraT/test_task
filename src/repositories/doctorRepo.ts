import {Repository } from 'typeorm';
import { Doctor } from '../entities/Doctor';
import { AppDataSource } from "../config/data-source"; 


export class DoctorRepository extends Repository<Doctor> {

    static findDoctor(id: number): Promise<Doctor | null> {
        return AppDataSource.getRepository(Doctor).findOne({ where: { id } });
    }

}