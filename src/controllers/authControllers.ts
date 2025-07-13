import { Request, Response } from 'express';

export const signup = (req: Request, res: Response) => {
  const { email, password, first_name, last_name } = req.body;

  if (!email || !password || !first_name || !last_name) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  res.status(201).json({
    message: 'User created successfully',
    user: { email, first_name, last_name },
  });
};
