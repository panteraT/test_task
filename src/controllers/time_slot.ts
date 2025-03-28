import { Request, Response } from 'express';
import { TimeSlotRepository } from '../repositories/timeSlotRepo';
import { DoctorRepository } from '../repositories/doctorRepo';
import { UserRepository } from '../repositories/userRepo';
import { AppointmentRepository } from '../repositories/appointmentRepo'

class TimeSlotController {

  static async getFreeTimeSlotsByDoctorId(req: Request, res: Response) {
    const doctorId = parseInt(req.params.doctor_id);
    const doctor  = await DoctorRepository.findDoctor(doctorId)

    if (doctor) {
        try {
            const rows = await TimeSlotRepository.findFreeSlotByDoctor(doctor)
            res.json(rows);
        } catch (error) {
        res.status(500).json({ error: 'Server error' });
        }
    } else {
        res.status(400).json({ error: "Doctor doesn't exist" });
    }
  }

  static async updateTimeSlot(req: Request, res: Response) {
    const doctorId = parseInt(req.body.doctor_id);
    const userId = parseInt(req.body.user_id);
    const date_time = req.body.date_time;

    try {
        const doctor = await DoctorRepository.findDoctor(doctorId);
        const user  = await UserRepository.findUser(userId);
        if (doctor && user) {
            const slot = await TimeSlotRepository.findFreeSlotByDoctorAndTime(doctor, date_time);
            if (slot) {
                try {
                    if (await TimeSlotRepository.updateSlot(slot.id, {user: user, is_free: false})) {
                        const appointment =  await AppointmentRepository.createAndSaveAppointment(
                          {date_time: date_time,
                            user: user,
                            time_slot: slot,
                            reminded24h: false,
                            reminded2h: false
                          })
                        console.log(`Time slot ${slot.id} busy with user.name. This user will reсieve the notifications`)
                        if (appointment) res.status(201).json({ message: `Time slot ${slot.id} busy with user.name. This user will reсieve the notifications` })
                    }
                }
                catch (err) {
                    throw new Error(`Server was fail when update time slot for user ${user.name}`);
                }
            } else {
              res.status(400).json({ message: `Free Time Slot with date: ${date_time} and doctorID: ${doctor.name} was not found` });
            }
        }
        else {
            res.status(400).json({ error: "Incorrect data!" });
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error!' });
    }
  }
}

export default TimeSlotController;