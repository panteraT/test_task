import {Repository } from 'typeorm';
import { User } from '../entities/User';
import { AppDataSource } from "../config/data-source"; 


export class UserRepository extends Repository<User> {
    static async findUser(id: number): Promise<User | null> {
        return await AppDataSource.getRepository(User).findOne({ where: { id } });
    }

}