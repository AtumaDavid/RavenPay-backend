import { Request, Response } from 'express';
import { processTransfer } from '../services/transferService';

export const handleTransfer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { senderId, recipientAccount, amount, reference } = req.body;
    if (!senderId || !recipientAccount || !amount || !reference) {
      throw new Error('Missing required fields');
    }
    const transaction = await processTransfer(
      Number(senderId),
      recipientAccount,
      Number(amount),
      reference
    );
    res.status(200).json({ message: 'Transfer completed', transaction });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
