import { Request, Response } from 'express';
import {
  getAccountDetails,
  getTransactionHistory,
} from '../services/accountService';

export const getAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = Number(req.params.userId);
    const account = await getAccountDetails(userId);
    res.status(200).json({ account });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = Number(req.params.userId);
    const transactions = await getTransactionHistory(userId);
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
