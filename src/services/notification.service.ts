import * as cron from 'node-cron';
// import { logger } from './logger';
import fs from 'fs';
import path from 'path';
import { AppointmentRepository } from '../repositories/appointmentRepo';

export class ReminderService {
  static init() {
    // Проверка каждые 15 минут
    cron.schedule('*/15 * * * *', async () => {
      try {
        await this.check24hReminders();
        await this.check2hReminders();
      } catch (error) {
        this.logToFile(`[ERROR] ${new Date().toISOString()} - ${error}`);
      }
    });
  }

  private static async check24hReminders() {
    const now = new Date();
    const targetDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    const appointments = await AppointmentRepository.findAppointments(targetDate, true)

    if (appointments)
        for (const appointment of appointments) {
            this.logToFile(`[24h] {{${now}}} Hi ${appointment.user.name}! 
            We remind you that you have an appointment with ${appointment.time_slot.doctor.speciality} about admission tomorrow at ${appointment.date_time}`);
        // Помечаем как отправленное
        await AppointmentRepository.updateAppointment(appointment.id, { reminded24h: true });
        }
  }

  private static async check2hReminders() {
    const now = new Date();
    const targetDate = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    
    const appointments = await AppointmentRepository.findAppointments(targetDate, false)

    if (appointments) 
        for (const appointment of appointments) {
            this.logToFile(`[2h] {{${now}}} Hi ${appointment.user.name}! 
                We remind you that you have an appointment with ${appointment.time_slot.doctor.speciality} about admission tomorrow at ${appointment.date_time}`);
            
            // Помечаем как отправленное
            await  AppointmentRepository.updateAppointment(appointment.id, { reminded2h: true });
        }
  }

  private static logToFile(message: string) {
      const logFilePath = path.join(__dirname, 'app.log');  
      const logMessage = `[INFO] ${new Date().toISOString()} - ${message}`;
      fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
          console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, err);
        }
      });
  }
}