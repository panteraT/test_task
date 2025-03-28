import { Request, Response } from 'express';
import pool from '../config/db';

class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const [rows] = await pool.query('SELECT * FROM users');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  static async createUser(req: Request, res: Response) {
    const { name, phone, email } = req.body;
    try {
      await pool.query('INSERT INTO users (name, phone, email) VALUES (?, ?, ?)', [name, phone, email]);
      res.status(201).json({ message: 'User created' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
}

export default UserController;