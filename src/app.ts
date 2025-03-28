import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user';
import timeSlotRoutes from './routes/timeSlot';
import dotenv from 'dotenv';
import { AppDataSource } from "../src/config/data-source";
import { ReminderService } from "./services/notification.service";


AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");
    ReminderService.init();
    console.log('Reminder service launched');
  })
  .catch((err) => console.error("Database error:", err));

  
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Middleware for handling URL-encoded request body
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRoutes);
app.use('/api', timeSlotRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});