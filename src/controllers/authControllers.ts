import { Request, Response } from 'express';
import { login, signup } from '../services/authService';

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const user = await signup(email, password, firstName, lastName);
    res.status(201).json({ message: 'user registered', user });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const token = await login(email, password);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
};
