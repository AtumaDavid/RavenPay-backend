import { User } from '../types';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/db';

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET as string | undefined;

export const signup = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  await db('users').insert({
    email,
    password: hashedPassword,
    first_name: firstName,
    last_name: lastName,
    created_at: new Date(),
    updated_at: new Date(),
  });
  const user = await db('users').where({ email }).first();
  return user;
};

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  const user = await db('users').where({ email }).first();
  if (!user || !(await bcrypt.compare(password, user.password))) {
    // Verify password
    throw new Error('Invalid credentials');
  }
  if (!jwtSecret) {
    throw new Error('JWT secret is not defined');
  }
  const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
    expiresIn: '1h',
  });
  return token;
};
