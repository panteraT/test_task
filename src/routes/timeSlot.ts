import { Router } from 'express';
import TimeSlotController from '../controllers/time_slot';

const router = Router();

router.get('/time_slots/:doctor_id', TimeSlotController.getFreeTimeSlotsByDoctorId);
router.post('/time_slots', TimeSlotController.updateTimeSlot);

export default router;